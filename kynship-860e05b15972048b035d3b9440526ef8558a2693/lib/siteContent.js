import fs from 'fs';
import path from 'path';
import { buildWhatsappUrl, normalizeWhatsappNumber } from './siteUtils';

export const defaultSettings = {
    brandName: 'Kynship',
    phone: '+20 100 000 0000',
    email: 'info@kynship.com',
    location: 'الزقازيق، محافظة الشرقية، مصر',
    whatsapp: '201000000000',
    instagram: 'https://instagram.com/kynship',
    facebook: 'https://facebook.com/kynship',
    goldColor: '#F2B705',
};

function readJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) return null;
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export { buildWhatsappUrl, normalizeWhatsappNumber };

export function loadSettings() {
    const settingsPath = path.join(process.cwd(), 'content', 'settings', 'index.json');
    const stored = readJsonFile(settingsPath) || {};
    return { ...defaultSettings, ...stored };
}

export function loadReviews() {
    const reviewsDir = path.join(process.cwd(), 'content', 'reviews');
    const legacyReviewsPath = path.join(process.cwd(), 'data', 'reviews.json');

    if (fs.existsSync(reviewsDir)) {
        const files = fs
            .readdirSync(reviewsDir)
            .filter((file) => file.endsWith('.json'))
            .sort((a, b) => a.localeCompare(b));

        const reviews = files
            .map((file, index) => {
                const record = readJsonFile(path.join(reviewsDir, file));
                if (!record) return null;
                return {
                    id: record.id || index + 1,
                    name: record.name || '',
                    location: record.location || '',
                    rating: Number(record.rating) || 5,
                    quote: record.quote || '',
                };
            })
            .filter(Boolean);

        if (reviews.length > 0) {
            return reviews;
        }
    }

    const legacyReviews = readJsonFile(legacyReviewsPath);
    if (Array.isArray(legacyReviews)) {
        return legacyReviews;
    }

    return [];
}

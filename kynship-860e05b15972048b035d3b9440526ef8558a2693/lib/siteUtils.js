export function normalizeWhatsappNumber(value) {
    const cleaned = String(value || '')
        .replace(/[^\d]/g, '')
        .trim();
    return cleaned || '201000000000';
}

export function buildWhatsappUrl(number, text = '') {
    const normalized = normalizeWhatsappNumber(number);
    if (!text) return `https://wa.me/${normalized}`;
    return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}

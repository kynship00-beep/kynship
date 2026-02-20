import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import TrustSection from '../components/TrustSection';
import StudioSection from '../components/StudioSection';
import ReviewsSection from '../components/ReviewsSection';
import CTASection from '../components/CTASection';
import {
    getRuntimeHomepage,
    getRuntimeReviews,
    getRuntimeSettings,
} from '../lib/runtimeContent';
import { normalizeWhatsappNumber } from '../lib/siteUtils';

const defaultHomeContent = {
    hero: {
        badge: 'مطابخ وغرف ملابس فاخرة',
        headline: 'نصمم مساحتك',
        accent: 'بدقة في كل تفصيلة.',
        subtext: 'مطابخ وغرف ملابس بتصميم مخصص وجودة تدوم.',
        primaryCtaText: 'اطلب معاينة مجانية',
        primaryCtaLink: 'https://wa.me/201000000000?text=أريد طلب معاينة مجانية',
        secondaryCtaText: 'استكشف أعمالنا',
        secondaryCtaLink: '/portfolio',
        backgroundImage: '/images/hero-kitchen.jpg',
    },
    categories: {
        label: 'تخصصاتنا',
        title: 'خدماتنا',
        subtitle: 'نقدم حلولًا متكاملة لتصميم وتنفيذ مساحاتك الداخلية بأعلى معايير الجودة.',
        items: [],
    },
    trust: {
        label: 'لماذا كينشيب',
        title: 'مميزاتنا',
        items: [],
    },
    studio: {
        label: 'استوديو التصميم',
        title: 'Kynship Design Studio',
        text: '',
        features: [],
        ctaText: 'احجز استشارة الآن',
        ctaLink: 'https://wa.me/201000000000?text=أريد حجز استشارة تصميم',
    },
    cta: {
        label: 'ابدأ رحلتك معنا',
        title: 'جاهز تبدأ مشروعك؟',
        subtitle: 'نحن هنا لنحول أفكارك إلى واقع. تواصل معنا اليوم للحصول على استشارة مجانية.',
        primaryText: 'تواصل معنا الآن',
        primaryLink: 'https://wa.me/201000000000?text=أريد التواصل معكم',
        secondaryText: 'أرسل رسالة',
        secondaryLink: '/contact',
    },
};

function mergeContent(defaultContent, storedContent) {
    return {
        ...defaultContent,
        ...storedContent,
        hero: { ...defaultContent.hero, ...(storedContent?.hero || {}) },
        categories: {
            ...defaultContent.categories,
            ...(storedContent?.categories || {}),
            items:
                Array.isArray(storedContent?.categories?.items) &&
                storedContent.categories.items.length > 0
                    ? storedContent.categories.items
                    : defaultContent.categories.items,
        },
        trust: {
            ...defaultContent.trust,
            ...(storedContent?.trust || {}),
            items:
                Array.isArray(storedContent?.trust?.items) && storedContent.trust.items.length > 0
                    ? storedContent.trust.items
                    : defaultContent.trust.items,
        },
        studio: {
            ...defaultContent.studio,
            ...(storedContent?.studio || {}),
            features:
                Array.isArray(storedContent?.studio?.features) &&
                storedContent.studio.features.length > 0
                    ? storedContent.studio.features
                    : defaultContent.studio.features,
        },
        cta: { ...defaultContent.cta, ...(storedContent?.cta || {}) },
    };
}

function updateWhatsappLink(link, whatsappNumber) {
    if (typeof link !== 'string' || !link.includes('wa.me/')) {
        return link;
    }
    return link.replace(/wa\.me\/\d+/i, `wa.me/${whatsappNumber}`);
}

function applySettingsToHomeContent(content, settings) {
    const whatsappNumber = normalizeWhatsappNumber(settings?.whatsapp);
    return {
        ...content,
        hero: {
            ...content.hero,
            primaryCtaLink: updateWhatsappLink(content.hero?.primaryCtaLink, whatsappNumber),
        },
        studio: {
            ...content.studio,
            ctaLink: updateWhatsappLink(content.studio?.ctaLink, whatsappNumber),
        },
        cta: {
            ...content.cta,
            primaryLink: updateWhatsappLink(content.cta?.primaryLink, whatsappNumber),
        },
    };
}

export default function HomePage({ homeContent, reviews }) {
    return (
        <>
            <Head>
                <title>كينشيب | مطابخ وغرف ملابس فاخرة بالزقازيق</title>
                <meta
                    name="description"
                    content="كينشيب - تصميم وتنفيذ مطابخ وغرف ملابس فاخرة بأعلى جودة في الزقازيق، مصر. تصميم 3D مجاني ومعاينة مجانية."
                />
                <meta property="og:title" content="كينشيب | مطابخ وغرف ملابس فاخرة" />
                <meta
                    property="og:description"
                    content="نصمم مساحتك بدقة في كل تفصيلة. مطابخ وغرف ملابس بتصميم مخصص وجودة تدوم."
                />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ar_EG" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="canonical" href="https://kynship.com" />
            </Head>

            <HeroSection data={homeContent.hero} />
            <CategoriesSection data={homeContent.categories} />
            <TrustSection data={homeContent.trust} />
            <StudioSection data={homeContent.studio} />
            <ReviewsSection reviews={reviews} />
            <CTASection data={homeContent.cta} />
        </>
    );
}

export async function getServerSideProps() {
    const [settings, reviews, storedHomeContent] = await Promise.all([
        getRuntimeSettings(),
        getRuntimeReviews(),
        getRuntimeHomepage(),
    ]);

    let homeContent = mergeContent(defaultHomeContent, storedHomeContent || {});
    homeContent = applySettingsToHomeContent(homeContent, settings);

    return {
        props: {
            homeContent,
            reviews,
            settings,
        },
    };
}

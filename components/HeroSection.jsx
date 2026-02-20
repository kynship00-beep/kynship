import Link from 'next/link';
import styles from './HeroSection.module.css';

const defaultData = {
    badge: 'مطابخ وغرف ملابس فاخرة',
    headline: 'نصمم مساحتك',
    accent: 'بدقة في كل تفصيلة.',
    subtext: 'مطابخ وغرف ملابس بتصميم مخصص وجودة تدوم.',
    primaryCtaText: 'اطلب معاينة مجانية',
    primaryCtaLink: 'https://wa.me/201000000000?text=أريد طلب معاينة مجانية',
    secondaryCtaText: 'استكشف أعمالنا',
    secondaryCtaLink: '/portfolio',
    backgroundImage: '/images/hero-kitchen.jpg',
};

function isExternalUrl(url) {
    return typeof url === 'string' && /^https?:\/\//i.test(url);
}

export default function HeroSection({ data = {} }) {
    const content = { ...defaultData, ...data };
    const heroStyle = content.backgroundImage
        ? { backgroundImage: `url('${content.backgroundImage}')` }
        : undefined;

    return (
        <section className={styles.hero} style={heroStyle}>
            <div className={styles.overlay} />
            <div className={`container ${styles.content}`}>
                <div className={styles.badge}>{content.badge}</div>
                <h1 className={styles.headline}>
                    {content.headline}
                    <br />
                    <span className={styles.accent}>{content.accent}</span>
                </h1>
                <p className={styles.subtext}>{content.subtext}</p>
                <div className={styles.ctas}>
                    <a
                        href={content.primaryCtaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold"
                    >
                        {content.primaryCtaText}
                    </a>
                    {isExternalUrl(content.secondaryCtaLink) ? (
                        <a
                            href={content.secondaryCtaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            {content.secondaryCtaText}
                        </a>
                    ) : (
                        <Link href={content.secondaryCtaLink || '/portfolio'} className="btn-outline">
                            {content.secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles.scrollHint}>
                <div className={styles.scrollLine} />
            </div>
        </section>
    );
}

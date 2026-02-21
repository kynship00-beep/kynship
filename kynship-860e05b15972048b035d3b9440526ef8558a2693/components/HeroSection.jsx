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
    const heroStyle = {
        ...(content.backgroundImage ? { backgroundImage: `url('${content.backgroundImage}')` } : {}),
    };

    const overlayStyle = {
        ...(content.overlayColor ? { backgroundColor: content.overlayColor } : {}),
        ...(content.overlayOpacity !== undefined ? { opacity: content.overlayOpacity } : {}),
    };

    const badgeStyle = {
        ...(content.badgeBg ? { backgroundColor: content.badgeBg } : {}),
        ...(content.badgeText ? { color: content.badgeText } : {}),
        ...(content.badgeSize ? { fontSize: `${content.badgeSize}px` } : {}),
        ...(content.badgeFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    const headlineStyle = {
        ...(content.headlineColor ? { color: content.headlineColor } : {}),
        ...(content.headlineSize ? { fontSize: `${content.headlineSize}px` } : {}),
        ...(content.headlineFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    const accentStyle = {
        ...(content.accentColor ? { color: content.accentColor } : {}),
        ...(content.headlineFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    const subtextStyle = {
        ...(content.subtextColor ? { color: content.subtextColor, opacity: 1 } : {}),
        ...(content.subtextSize ? { fontSize: `${content.subtextSize}px` } : {}),
        ...(content.subtextFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    const primaryStyle = {
        ...(content.primaryBtnBg ? { backgroundColor: content.primaryBtnBg, borderColor: content.primaryBtnBg } : {}),
        ...(content.primaryBtnText ? { color: content.primaryBtnText } : {}),
        ...(content.primaryBtnSize ? { fontSize: `${content.primaryBtnSize}px` } : {}),
        ...(content.primaryBtnFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    const secondaryStyle = {
        ...(content.secondaryBtnBorder ? { borderColor: content.secondaryBtnBorder } : {}),
        ...(content.secondaryBtnText ? { color: content.secondaryBtnText } : {}),
        ...(content.secondaryBtnSize ? { fontSize: `${content.secondaryBtnSize}px` } : {}),
        ...(content.secondaryBtnFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    const scrollLineStyle = content.accentColor ? { backgroundColor: content.accentColor } : {};

    return (
        <section className={styles.hero} style={heroStyle}>
            <div className={styles.overlay} style={overlayStyle} />
            <div className={`container ${styles.content}`}>
                <div className={styles.badge} style={badgeStyle}>{content.badge}</div>
                <h1 className={styles.headline} style={headlineStyle}>
                    {content.headline}
                    <br />
                    <span className={styles.accent} style={accentStyle}>{content.accent}</span>
                </h1>
                <p className={styles.subtext} style={subtextStyle}>
                    {content.subtext}
                </p>
                <div className={styles.ctas}>
                    <a
                        href={content.primaryCtaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold"
                        style={primaryStyle}
                    >
                        {content.primaryCtaText}
                    </a>
                    {isExternalUrl(content.secondaryCtaLink) ? (
                        <a
                            href={content.secondaryCtaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                            style={secondaryStyle}
                        >
                            {content.secondaryCtaText}
                        </a>
                    ) : (
                        <Link href={content.secondaryCtaLink || '/portfolio'} className="btn-outline" style={secondaryStyle}>
                            {content.secondaryCtaText}
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles.scrollHint}>
                <div className={styles.scrollLine} style={scrollLineStyle} />
            </div>
        </section>
    );
}

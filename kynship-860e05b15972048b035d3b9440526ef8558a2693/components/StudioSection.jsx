import styles from './StudioSection.module.css';

const defaultData = {
    label: 'استوديو التصميم',
    title: 'Kynship Design Studio',
    text: 'فريقنا يساعدك من أول فكرة حتى التسليم. استشارة احترافية تضمن أفضل استغلال للمساحة وتنفيذ دقيق لكل تفصيلة.',
    features: [
        '✦ تصميم ثلاثي الأبعاد قبل التنفيذ',
        '✦ خامات عالية الجودة',
        '✦ التسليم في الوقت المحدد',
        '✦ ضمان شامل على جميع المنتجات',
    ],
    ctaText: 'احجز استشارة الآن',
    ctaLink: 'https://wa.me/201000000000?text=أريد حجز استشارة تصميم',
};

export default function StudioSection({ data = {} }) {
    const content = {
        ...defaultData,
        ...data,
        features:
            Array.isArray(data.features) && data.features.length > 0 ? data.features : defaultData.features,
    };

    const sectionStyle = {
        ...(content.sectionBg ? { backgroundColor: content.sectionBg } : {}),
    };

    const labelStyle = {
        ...(content.labelColor ? { color: content.labelColor } : {}),
        ...(content.labelSize ? { fontSize: `${content.labelSize}px` } : {}),
        ...(content.labelFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const titleStyle = {
        ...(content.titleColor ? { color: content.titleColor } : {}),
        ...(content.titleSize ? { fontSize: `${content.titleSize}px` } : {}),
        ...(content.titleFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const textStyle = {
        ...(content.textColor ? { color: content.textColor } : {}),
        ...(content.textSize ? { fontSize: `${content.textSize}px` } : {}),
        ...(content.textFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const featureIconStyle = content.featureIconColor ? { color: content.featureIconColor } : {};
    const featureTextStyle = {
        ...(content.featureTextColor ? { color: content.featureTextColor } : {}),
        ...(content.featureTextSize ? { fontSize: `${content.featureTextSize}px` } : {}),
    };
    const ctaStyle = {
        ...(content.ctaBg ? { backgroundColor: content.ctaBg, borderColor: content.ctaBg } : {}),
        ...(content.ctaTextColor ? { color: content.ctaTextColor } : {}),
        ...(content.ctaFontSize ? { fontSize: `${content.ctaFontSize}px` } : {}),
        ...(content.ctaFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    return (
        <section className={styles.section} style={sectionStyle}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.content}>
                        <span className={styles.label} style={labelStyle}>{content.label}</span>
                        <h2 className={styles.title} style={titleStyle}>{content.title}</h2>
                        <div className={styles.goldLine} />
                        <p className={styles.text} style={textStyle}>{content.text}</p>
                        <ul className={styles.features}>
                            {content.features.map((feature, index) => (
                                <li key={`${feature}-${index}`} style={featureTextStyle}>
                                    <span style={featureIconStyle}>+ </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <a
                            href={content.ctaLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold"
                            style={ctaStyle}
                        >
                            {content.ctaText}
                        </a>
                    </div>
                    <div className={styles.visual}>
                        <div className={styles.visualGrid}>
                            {[0, 1, 2, 3].map((index) => {
                                const imageUrl = content.images?.[index];
                                return (
                                    <div
                                        key={index}
                                        className={styles.visualItem}
                                        style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                                    >
                                        <div className={styles.visualInner}>
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt=""
                                                    className={styles.gridImage}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

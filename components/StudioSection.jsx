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

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.content}>
                        <span className={styles.label}>{content.label}</span>
                        <h2 className={styles.title}>{content.title}</h2>
                        <div className={styles.goldLine} />
                        <p className={styles.text}>{content.text}</p>
                        <ul className={styles.features}>
                            {content.features.map((feature, index) => (
                                <li key={`${feature}-${index}`}>{feature}</li>
                            ))}
                        </ul>
                        <a href={content.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-gold">
                            {content.ctaText}
                        </a>
                    </div>
                    <div className={styles.visual}>
                        <div className={styles.visualGrid}>
                            {[1, 2, 3, 4].map((n) => (
                                <div
                                    key={n}
                                    className={styles.visualItem}
                                    style={{ animationDelay: `${n * 0.1}s` }}
                                >
                                    <div className={styles.visualInner} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

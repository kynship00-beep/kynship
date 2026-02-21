import Link from 'next/link';
import styles from './CategoriesSection.module.css';

const defaultData = {
    label: 'تخصصاتنا',
    title: 'خدماتنا',
    subtitle: 'نقدم حلولًا متكاملة لتصميم وتنفيذ مساحاتك الداخلية بأعلى معايير الجودة.',
    items: [
        {
            title: 'مطابخ',
            subtitle: 'تصاميم عصرية وكلاسيكية',
            href: '/portfolio?category=مطابخ',
            bg: '#1B3A52',
            image: '/images/cat-kitchen.jpg',
        },
        {
            title: 'غرف ملابس',
            subtitle: 'تنظيم مثالي وأناقة فائقة',
            href: '/portfolio?category=غرف ملابس',
            bg: '#213E56',
            image: '/images/cat-wardrobe.jpg',
        },
        {
            title: 'وحدات تلفزيون',
            subtitle: 'تصاميم مخصصة لكل مساحة',
            href: '/portfolio?category=وحدات تلفزيون',
            bg: '#1F3447',
            image: '/images/cat-tv.jpg',
        },
        {
            title: 'تصميمات خاصة',
            subtitle: 'أفكارك بلمستنا الاحترافية',
            href: '/portfolio?category=تصميمات خاصة',
            bg: '#25384A',
            image: '/images/cat-special.jpg',
        },
    ],
};

export default function CategoriesSection({ data = {} }) {
    const content = {
        ...defaultData,
        ...data,
        items: Array.isArray(data.items) && data.items.length > 0 ? data.items : defaultData.items,
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
    const subtitleStyle = {
        ...(content.subtitleColor ? { color: content.subtitleColor } : {}),
        ...(content.subtitleSize ? { fontSize: `${content.subtitleSize}px` } : {}),
        ...(content.subtitleFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const cardBgStyle = content.cardBg ? { backgroundColor: content.cardBg } : {};
    const cardTitleStyle = {
        ...(content.cardTitleColor ? { color: content.cardTitleColor } : {}),
        ...(content.cardTitleSize ? { fontSize: `${content.cardTitleSize}px` } : {}),
    };
    const cardSubStyle = content.cardSubColor ? { color: content.cardSubColor } : {};

    return (
        <section className={`section ${styles.section}`} style={sectionStyle}>
            <div className="container">
                <div className={styles.header}>
                    <span className="section-label" style={labelStyle}>{content.label}</span>
                    <h2 className="section-title" style={titleStyle}>{content.title}</h2>
                    <div className="gold-divider" />
                    <p className="section-subtitle" style={subtitleStyle}>{content.subtitle}</p>
                </div>
                <div className={styles.grid}>
                    {content.items.map((cat, index) => (
                        <Link href={cat.href || '/portfolio'} key={`${cat.title}-${index}`} className={styles.card} style={cardBgStyle}>
                            <div className={styles.imageWrap} style={{ background: cat.bg || '#1B3A52' }}>
                                {cat.image ? (
                                    <img src={cat.image} alt={cat.title || 'Category'} className={styles.cardImage} />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        <span className={styles.placeholderIcon}>◻</span>
                                    </div>
                                )}
                                <div className={styles.cardOverlay} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle} style={cardTitleStyle}>{cat.title}</h3>
                                <p className={styles.cardSub} style={cardSubStyle}>{cat.subtitle}</p>
                                <span className={styles.arrow}>←</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

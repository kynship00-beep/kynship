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

    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className="section-label">{content.label}</span>
                    <h2 className="section-title">{content.title}</h2>
                    <div className="gold-divider" />
                    <p className="section-subtitle">{content.subtitle}</p>
                </div>
                <div className={styles.grid}>
                    {content.items.map((cat, index) => (
                        <Link href={cat.href || '/portfolio'} key={`${cat.title}-${index}`} className={styles.card}>
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
                                <h3 className={styles.cardTitle}>{cat.title}</h3>
                                <p className={styles.cardSub}>{cat.subtitle}</p>
                                <span className={styles.arrow}>←</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

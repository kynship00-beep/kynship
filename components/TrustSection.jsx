import styles from './TrustSection.module.css';

const defaultData = {
    label: 'لماذا كينشيب',
    title: 'مميزاتنا',
    items: [
        {
            icon: '🏗️',
            title: 'تصميم 3D قبل التنفيذ',
            desc: 'نقدم لك رؤية كاملة بالتفاصيل قبل البدء في التنفيذ.',
        },
        {
            icon: '🔍',
            title: 'معاينة مجانية',
            desc: 'فريقنا يزورك لتقييم المساحة ووضع أفضل الحلول.',
        },
        {
            icon: '✅',
            title: 'ضمان على الخامات',
            desc: 'نستخدم أجود الخامات مع ضمان شامل يضمن ثقتك.',
        },
        {
            icon: '🛠️',
            title: 'خدمة ما بعد البيع',
            desc: 'دعم فني مستمر وصيانة دورية بعد التسليم.',
        },
    ],
};

/**
 * TrustSection Component
 * 
 * Displays a list of "Trust Features" or "Why Choose Us" items.
 * Each item consists of an icon (emoji), a title, and a brief description.
 * 
 * Data Structure (passed via 'data' prop from TinaCMS):
 * - label: Short badge text above the title.
 * - title: Main section heading.
 * - items: Array of objects [{ icon: string, title: string, desc: string }]
 * - Styling properties: labelColor, labelSize, titleColor, titleSize, sectionBg, cardBg, iconBg, etc.
 */
export default function TrustSection({ data = {} }) {
    // Merge provided data with defaults to ensure component always renders properly
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
    const cardStyle = {
        ...(content.cardBg ? { backgroundColor: content.cardBg } : {}),
    };
    const cardTitleStyle = content.cardTitleColor ? { color: content.cardTitleColor } : {};
    const cardDescStyle = content.cardDescColor ? { color: content.cardDescColor } : {};
    const iconWrapStyle = {
        ...(content.iconBg ? { backgroundColor: content.iconBg } : {}),
    };
    const iconStyle = content.iconColor ? { color: content.iconColor } : {};

    return (
        <section className={`section ${styles.section}`} style={sectionStyle}>
            <div className="container">
                <div className={styles.header}>
                    <span className="section-label" style={labelStyle}>{content.label}</span>
                    <h2 className="section-title" style={titleStyle}>{content.title}</h2>
                    <div className="gold-divider" />
                </div>
                <div className={styles.grid}>
                    {content.items.map((item, index) => (
                        <div key={`${item.title}-${index}`} className={styles.card} style={cardStyle}>
                            <div className={styles.iconWrap} style={iconWrapStyle}>
                                <span className={styles.icon} style={iconStyle}>{item.icon}</span>
                            </div>
                            <h3 className={styles.title} style={cardTitleStyle}>{item.title}</h3>
                            <p className={styles.desc} style={cardDescStyle}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

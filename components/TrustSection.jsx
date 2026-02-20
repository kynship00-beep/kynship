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

export default function TrustSection({ data = {} }) {
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
                </div>
                <div className={styles.grid}>
                    {content.items.map((item, index) => (
                        <div key={`${item.title}-${index}`} className={styles.card}>
                            <div className={styles.iconWrap}>
                                <span className={styles.icon}>{item.icon}</span>
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.desc}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

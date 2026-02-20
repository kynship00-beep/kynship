import Link from 'next/link';
import styles from './CTASection.module.css';

const defaultData = {
    label: 'ابدأ رحلتك معنا',
    title: 'جاهز تبدأ مشروعك؟',
    subtitle: 'نحن هنا لنحول أفكارك إلى واقع. تواصل معنا اليوم للحصول على استشارة مجانية.',
    primaryText: 'تواصل معنا الآن',
    primaryLink: 'https://wa.me/201000000000?text=أريد التواصل معكم',
    secondaryText: 'أرسل رسالة',
    secondaryLink: '/contact',
};

function isExternalUrl(url) {
    return typeof url === 'string' && /^https?:\/\//i.test(url);
}

export default function CTASection({ data = {} }) {
    const content = { ...defaultData, ...data };

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.inner}>
                    <span className="section-label" style={{ color: 'rgba(242,183,5,0.95)' }}>
                        {content.label}
                    </span>
                    <h2 className={styles.title}>{content.title}</h2>
                    <p className={styles.subtitle}>{content.subtitle}</p>
                    <div className={styles.actions}>
                        <a
                            href={content.primaryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold"
                        >
                            {content.primaryText}
                        </a>
                        {isExternalUrl(content.secondaryLink) ? (
                            <a
                                href={content.secondaryLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                            >
                                {content.secondaryText}
                            </a>
                        ) : (
                            <Link href={content.secondaryLink || '/contact'} className="btn-outline">
                                {content.secondaryText}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

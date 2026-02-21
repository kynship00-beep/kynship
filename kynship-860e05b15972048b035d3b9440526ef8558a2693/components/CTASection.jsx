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

    const sectionStyle = {
        ...(content.sectionBg ? { backgroundColor: content.sectionBg } : {}),
    };

    const labelStyle = {
        ...(content.labelColor ? { color: content.labelColor } : { color: 'rgba(242,183,5,0.95)' }),
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

    return (
        <section className={styles.section} style={sectionStyle}>
            <div className="container">
                <div className={styles.inner}>
                    <span className="section-label" style={labelStyle}>
                        {content.label}
                    </span>
                    <h2 className={styles.title} style={titleStyle}>{content.title}</h2>
                    <p className={styles.subtitle} style={subtitleStyle}>{content.subtitle}</p>
                    <div className={styles.actions}>
                        <a
                            href={content.primaryLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-gold"
                            style={primaryStyle}
                        >
                            {content.primaryText}
                        </a>
                        {isExternalUrl(content.secondaryLink) ? (
                            <a
                                href={content.secondaryLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline"
                                style={secondaryStyle}
                            >
                                {content.secondaryText}
                            </a>
                        ) : (
                            <Link href={content.secondaryLink || '/contact'} className="btn-outline" style={secondaryStyle}>
                                {content.secondaryText}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

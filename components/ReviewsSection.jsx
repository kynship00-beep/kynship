import styles from './ReviewsSection.module.css';

const AR = {
    label: '\u0622\u0631\u0627\u0621 \u0639\u0645\u0644\u0627\u0626\u0646\u0627',
    title: '\u0645\u0627\u0630\u0627 \u0642\u0627\u0644\u0648\u0627 \u0639\u0646\u0627',
};

export default function ReviewsSection({ reviews = [], data = {} }) {
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return null;
    }

    const styles_data = data.style || {};
    const sectionStyle = {
        ...(data.sectionBg ? { backgroundColor: data.sectionBg } : {}),
        ...(styles_data.sectionBg ? { backgroundColor: styles_data.sectionBg } : {}),
    };
    const labelStyle = {
        ...(data.labelColor ? { color: data.labelColor } : {}),
        ...(styles_data.labelColor ? { color: styles_data.labelColor } : {}),
        ...(data.labelSize ? { fontSize: `${data.labelSize}px` } : {}),
        ...(styles_data.labelSize ? { fontSize: `${styles_data.labelSize}px` } : {}),
        ...((data.labelFont === 'CustomFont' || styles_data.labelFont === 'CustomFont') ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const titleStyle = {
        ...(data.titleColor ? { color: data.titleColor } : {}),
        ...(styles_data.titleColor ? { color: styles_data.titleColor } : {}),
        ...(data.titleSize ? { fontSize: `${data.titleSize}px` } : {}),
        ...(styles_data.titleSize ? { fontSize: `${styles_data.titleSize}px` } : {}),
        ...((data.titleFont === 'CustomFont' || styles_data.titleFont === 'CustomFont') ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    return (
        <section className={`section ${styles.section}`} style={sectionStyle}>
            <div className="container">
                <div className={styles.header}>
                    <span className="section-label" style={labelStyle}>{data.label || AR.label}</span>
                    <h2 className="section-title" style={titleStyle}>{data.title || AR.title}</h2>
                    <div className="gold-divider" />
                </div>
                <div className={styles.grid}>
                    {reviews.map((review, index) => {
                        const review_style = review.style || {};
                        const cardStyle = {
                            ...(review.cardBg ? { backgroundColor: review.cardBg } : {}),
                            ...(review_style.cardBg ? { backgroundColor: review_style.cardBg } : {}),
                        };
                        const starStyle = {
                            ...(review.starColor ? { color: review.starColor } : {}),
                            ...(review_style.starColor ? { color: review_style.starColor } : {}),
                        };
                        const quoteStyle = {
                            ...(review.quoteColor ? { color: review.quoteColor } : {}),
                            ...(review_style.quoteColor ? { color: review_style.quoteColor } : {}),
                            ...(review.quoteSize ? { fontSize: `${review.quoteSize}px` } : {}),
                            ...(review_style.quoteSize ? { fontSize: `${review_style.quoteSize}px` } : {}),
                            ...((review.quoteFont === 'CustomFont' || review_style.quoteFont === 'CustomFont') ? { fontFamily: "'CustomFont', sans-serif" } : {}),
                        };
                        const nameStyle = {
                            ...(review.nameColor ? { color: review.nameColor } : {}),
                            ...(review_style.nameColor ? { color: review_style.nameColor } : {}),
                            ...(review.nameSize ? { fontSize: `${review.nameSize}px` } : {}),
                            ...(review_style.nameSize ? { fontSize: `${review_style.nameSize}px` } : {}),
                        };
                        const locationStyle = {
                            ...(review.locationColor ? { color: review.locationColor } : {}),
                            ...(review_style.locationColor ? { color: review_style.locationColor } : {}),
                            ...(review.locationSize ? { fontSize: `${review.locationSize}px` } : {}),
                            ...(review_style.locationSize ? { fontSize: `${review_style.locationSize}px` } : {}),
                        };

                        return (
                            <div key={review.id || index} className={styles.card} style={cardStyle}>
                                <div className={styles.stars} style={starStyle}>
                                    {'★'.repeat(Math.max(1, Number(review.rating) || 5))}
                                </div>
                                <p className={styles.quote} style={quoteStyle}>&ldquo;{review.quote}&rdquo;</p>
                                <div className={styles.client}>
                                    <div className={styles.avatar}>{(review.name || '?').charAt(0)}</div>
                                    <div>
                                        <div className={styles.name} style={nameStyle}>{review.name}</div>
                                        <div className={styles.location} style={locationStyle}>{review.location}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

import styles from './ReviewsSection.module.css';

const AR = {
    label: '\u0622\u0631\u0627\u0621 \u0639\u0645\u0644\u0627\u0626\u0646\u0627',
    title: '\u0645\u0627\u0630\u0627 \u0642\u0627\u0644\u0648\u0627 \u0639\u0646\u0627',
};

export default function ReviewsSection({ reviews = [] }) {
    if (!Array.isArray(reviews) || reviews.length === 0) {
        return null;
    }

    return (
        <section className={`section ${styles.section}`}>
            <div className="container">
                <div className={styles.header}>
                    <span className="section-label">{AR.label}</span>
                    <h2 className="section-title">{AR.title}</h2>
                    <div className="gold-divider" />
                </div>
                <div className={styles.grid}>
                    {reviews.map((review, index) => (
                        <div key={review.id || index} className={styles.card}>
                            <div className={styles.stars}>{'★'.repeat(Math.max(1, Number(review.rating) || 5))}</div>
                            <p className={styles.quote}>&ldquo;{review.quote}&rdquo;</p>
                            <div className={styles.client}>
                                <div className={styles.avatar}>{(review.name || '?').charAt(0)}</div>
                                <div>
                                    <div className={styles.name}>{review.name}</div>
                                    <div className={styles.location}>{review.location}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

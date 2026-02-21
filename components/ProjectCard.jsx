import Link from 'next/link';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
    const cardStyle = {
        ...(project.cardBg ? { backgroundColor: project.cardBg } : {}),
    };
    const titleStyle = {
        ...(project.titleColor ? { color: project.titleColor } : {}),
        ...(project.titleSize ? { fontSize: `${project.titleSize}px` } : {}),
        ...(project.titleFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const descStyle = {
        ...(project.descColor ? { color: project.descColor } : {}),
        ...(project.descSize ? { fontSize: `${project.descSize}px` } : {}),
        ...(project.descFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    return (
        <Link href={`/portfolio/${project.id}`} className={styles.card} style={cardStyle}>
            <div className={styles.imageWrap}>
                {project.images && project.images[0] ? (
                    <img
                        src={project.images[0]}
                        alt={project.title}
                        className={styles.cardImage}
                    />
                ) : (
                    <div className={styles.placeholder}>
                        <span className={styles.categoryBadge}>{project.category}</span>
                    </div>
                )}
                <div className={styles.overlay} />
            </div>
            <div className={styles.info}>
                <span className={styles.category}>{project.category}</span>
                <h3 className={styles.title} style={titleStyle}>{project.title}</h3>
                <p className={styles.desc} style={descStyle}>{project.description}</p>
                <div className={styles.footer}>
                    <span className={styles.date}>{project.completionDate}</span>
                    <span className={styles.arrow}>← عرض المشروع</span>
                </div>
            </div>
        </Link>
    );
}

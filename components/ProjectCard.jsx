import Link from 'next/link';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project }) {
    return (
        <Link href={`/portfolio/${project.id}`} className={styles.card}>
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
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
                <div className={styles.footer}>
                    <span className={styles.date}>{project.completionDate}</span>
                    <span className={styles.arrow}>← عرض المشروع</span>
                </div>
            </div>
        </Link>
    );
}

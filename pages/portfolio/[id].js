import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/ProjectDetail.module.css';
import {
    getRuntimeProjectById,
    getRuntimeSettings,
} from '../../lib/runtimeContent';
import { buildWhatsappUrl, normalizeWhatsappNumber } from '../../lib/siteUtils';

export default function ProjectDetailPage({ project, settings }) {
    const [selectedImage, setSelectedImage] = useState(null);
    const whatsappNumber = normalizeWhatsappNumber(settings?.whatsapp);
    const similarProjectLink = buildWhatsappUrl(whatsappNumber, 'أريد مشروع مشابه');

    if (!project) {
        return (
            <div className="container" style={{ padding: '120px 24px', textAlign: 'center' }}>
                <h1>المشروع غير موجود</h1>
                <Link href="/portfolio" className="btn-gold" style={{ marginTop: 24, display: 'inline-block' }}>
                    العودة لمعرض الأعمال
                </Link>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{project.title} | كينشيب</title>
                <meta name="description" content={project.description} />
                <meta property="og:title" content={`${project.title} | كينشيب`} />
                <meta property="og:description" content={project.description} />
                <meta property="og:type" content="article" />
            </Head>

            <div className={styles.page}>
                {/* Hero */}
                <div
                    className={styles.hero}
                    style={project.images && project.images[0] ? {
                        backgroundImage: `url(${project.images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    } : {}}
                >
                    <div className={styles.heroOverlay} />
                    <div className={`container ${styles.heroContent}`}>
                        <span className={styles.category}>{project.category}</span>
                        <h1 className={styles.title}>{project.title}</h1>
                        <p className={styles.date}>تاريخ الإنجاز: {project.completionDate}</p>
                    </div>
                </div>

                {/* Content */}
                <section className="section">
                    <div className="container">
                        <div className={styles.layout}>
                            <div className={styles.main}>
                                <h2 className={styles.sectionTitle}>وصف المشروع</h2>
                                <div className="gold-divider" />
                                <p className={styles.description}>{project.description}</p>

                                {/* Image Gallery */}
                                <div className={styles.gallery}>
                                    {project.images && project.images.map((img, i) => (
                                        <div
                                            key={i}
                                            className={styles.imageSlot}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <img
                                                src={img}
                                                alt={`${project.title} - ${i + 1}`}
                                                className={styles.galleryImage}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <aside className={styles.sidebar}>
                                <div className={styles.infoCard}>
                                    <h3>تفاصيل المشروع</h3>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>الفئة</span>
                                        <span>{project.category}</span>
                                    </div>
                                    <div className={styles.infoRow}>
                                        <span className={styles.infoLabel}>تاريخ الإنجاز</span>
                                        <span>{project.completionDate}</span>
                                    </div>
                                </div>
                                <a
                                    href={similarProjectLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gold"
                                    style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                                >
                                    أريد مشروع مشابه
                                </a>
                                <Link href="/portfolio" className="btn-outline-dark" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                                    العودة للأعمال
                                </Link>
                            </aside>
                        </div>
                    </div>
                </section>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className={styles.lightbox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            className={styles.lightboxContent}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage} alt="Large view" className={styles.lightboxImage} />
                            <button
                                className={styles.closeLightbox}
                                onClick={() => setSelectedImage(null)}
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const projectId = params?.id || '';
    const [settings, project] = await Promise.all([
        getRuntimeSettings(),
        getRuntimeProjectById(projectId),
    ]);

    if (!project) {
        return {
            notFound: true,
        };
    }

    return {
        props: { project, settings },
    };
}

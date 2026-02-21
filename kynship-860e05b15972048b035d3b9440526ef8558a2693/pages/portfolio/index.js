import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import ProjectCard from '../../components/ProjectCard';
import styles from '../../styles/Portfolio.module.css';
import { getRuntimeProjects, getRuntimeSettings } from '../../lib/runtimeContent';

export default function PortfolioPage({ projects, settings }) {
    const router = useRouter();
    const { category } = router.query;
    const [activeCategory, setActiveCategory] = useState('الكل');

    const categories = useMemo(() => {
        const catsFromSettings = settings?.categories || [];
        return ['الكل', ...catsFromSettings];
    }, [settings?.categories]);

    useEffect(() => {
        if (category && categories.includes(category)) {
            setActiveCategory(category);
        } else {
            setActiveCategory('الكل');
        }
    }, [category, categories]);

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'الكل') return projects;
        return projects.filter(p => p.category === activeCategory);
    }, [activeCategory, projects]);

    const handleCategoryClick = (cat) => {
        if (cat === 'الكل') {
            router.push('/portfolio', undefined, { shallow: true });
        } else {
            router.push(`/portfolio?category=${cat}`, undefined, { shallow: true });
        }
    };

    return (
        <>
            <Head>
                <title>أعمالنا | كينشيب</title>
                <meta
                    name="description"
                    content="استعرض مشاريع كينشيب - مطابخ وغرف ملابس ووحدات تلفزيون بتصميمات فاخرة في مصر."
                />
                <meta property="og:title" content="أعمالنا | كينشيب" />
                <meta property="og:type" content="website" />
            </Head>

            <div className={styles.page}>
                {/* Header */}
                <div
                    className={styles.pageHeader}
                    style={{
                        ...(settings?.portfolio?.sectionBg ? { backgroundColor: settings.portfolio.sectionBg, backgroundImage: 'none' } : {}),
                    }}
                >
                    <div className="container">
                        <span
                            className="section-label"
                            style={{
                                ...(settings?.portfolio?.labelColor ? { color: settings.portfolio.labelColor } : {}),
                                ...(settings?.portfolio?.labelSize ? { fontSize: `${settings.portfolio.labelSize}px` } : {}),
                                ...(settings?.portfolio?.labelFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
                            }}
                        >
                            {settings?.portfolio?.label || 'معرض الأعمال'}
                        </span>
                        <h1
                            className={styles.pageTitle}
                            style={{
                                ...(settings?.portfolio?.titleColor ? { color: settings.portfolio.titleColor } : {}),
                                ...(settings?.portfolio?.titleSize ? { fontSize: `${settings.portfolio.titleSize}px` } : {}),
                                ...(settings?.portfolio?.titleFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
                            }}
                        >
                            {settings?.portfolio?.title || 'أعمالنا'}
                        </h1>
                        <div className="gold-divider" />
                        <p
                            className={styles.pageSub}
                            style={{
                                ...(settings?.portfolio?.subtitleColor ? { color: settings.portfolio.subtitleColor } : {}),
                                ...(settings?.portfolio?.subtitleSize ? { fontSize: `${settings.portfolio.subtitleSize}px` } : {}),
                                ...(settings?.portfolio?.subtitleFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
                            }}
                        >
                            {settings?.portfolio?.subtitle || 'مجموعة من أعمالنا المتميزة في تصميم وتنفيذ المطابخ وغرف الملابس'}
                        </p>
                    </div>

                    {/* Filter Bar */}
                    <div className={styles.filterBar}>
                        <div className="container">
                            <div className={styles.filterList}>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
                                        onClick={() => handleCategoryClick(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid */}
                <section className="section">
                    <div className="container">
                        {filteredProjects.length === 0 ? (
                            <div className={styles.empty}>
                                <p>لا توجد مشاريع في هذا القسم حالياً.</p>
                            </div>
                        ) : (
                            <div className={styles.grid}>
                                {filteredProjects.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const [settings, projects] = await Promise.all([
        getRuntimeSettings(),
        getRuntimeProjects(),
    ]);

    return {
        props: { projects, settings },
    };
}

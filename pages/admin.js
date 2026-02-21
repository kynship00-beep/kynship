import { useState } from 'react';
import Head from 'next/head';

const sections = [
    {
        emoji: '🏠',
        title: 'الصفحة الرئيسية',
        subtitle: 'Homepage',
        desc: 'الكلام، الصور، الألوان — كل حاجة في أول الموقع',
        details: ['🎯 قسم الهيرو', '🗂️ الأقسام', '✅ المميزات', '🎨 الاستوديو', '⭐ آراء العملاء', '📣 الدعوة للتواصل'],
        tinaPath: '/homepage/index',
        color: '#234A68',
        lightColor: 'rgba(35,74,104,0.08)',
    },
    {
        emoji: '🗂️',
        title: 'المشاريع',
        subtitle: 'Projects',
        desc: 'صور أعمالك، الأوصاف، والتصنيفات',
        details: ['📸 صور المشروع', '📁 القسم (مطابخ / غرف ملابس)', '📝 الوصف', '🎨 ألوان البطاقة'],
        tinaPath: '/project',
        color: '#1B6042',
        lightColor: 'rgba(27,96,66,0.08)',
    },
    {
        emoji: '⭐',
        title: 'آراء العملاء',
        subtitle: 'Reviews',
        desc: 'إضافة وتعديل شهادات العملاء',
        details: ['👤 اسم العميل', '💬 الرأي', '⭐ التقييم', '📍 الموقع', '🎨 ألوان البطاقة'],
        tinaPath: '/review',
        color: '#7B5B00',
        lightColor: 'rgba(123,91,0,0.08)',
    },
    {
        emoji: '⚙️',
        title: 'إعدادات الموقع',
        subtitle: 'Site Settings',
        desc: 'واتساب، الألوان العامة، الهيدر، الفوتر',
        details: ['📱 واتساب وتواصل', '🔝 الهيدر واللوجو', '🎨 ألوان الموقع', '🔗 روابط التواصل الاجتماعي'],
        tinaPath: '/settings/index',
        color: '#522D80',
        lightColor: 'rgba(82,45,128,0.08)',
    },
];

const quickTips = [
    { icon: '💡', text: 'كل تغيير بتسيفه هيظهر على الموقع تلقائياً' },
    { icon: '🎨', text: 'اضغط على ربع الدايرة الملونة عشان تفتح Color Picker' },
    { icon: '📸', text: 'الصور لازم تكون بمقاس مناسب (1920×1080 للخلفيات)' },
    { icon: '🔢', text: 'حجم الخطوط بالـ px — مثلاً 16 يعني 16 بكسل' },
];

export default function AdminDashboard() {
    const [hovered, setHovered] = useState(null);

    function goToTina(path) {
        const devUrl = `http://localhost:4001/index.html#/collections${path}`;
        const prodUrl = `/admin/index.html#/collections${path}`;
        window.open(
            process.env.NODE_ENV === 'development' ? devUrl : prodUrl,
            '_blank'
        );
    }

    function goToTinaMain() {
        window.open(
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:4001'
                : '/admin/index.html',
            '_blank'
        );
    }

    return (
        <>
            <Head>
                <title>Kynship — لوحة التحكم</title>
                <meta name="robots" content="noindex,nofollow" />
                <link
                    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Arabic:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div style={{
                minHeight: '100vh',
                background: '#F5F5F5',
                fontFamily: "'IBM Plex Arabic', 'Segoe UI', sans-serif",
                direction: 'rtl',
            }}>
                {/* Header */}
                <div style={{
                    background: '#0A192F',
                    padding: '0 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 64,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                            width: 36, height: 36,
                            background: '#F2B705',
                            borderRadius: 6,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, fontWeight: 700, color: '#0A192F',
                        }}>K</div>
                        <div>
                            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Kynship</div>
                            <div style={{ color: '#F2B705', fontWeight: 500, fontSize: 12, letterSpacing: 1 }}>لوحة التحكم</div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <a href="/" target="_blank" style={outlineBtn}>
                            👁️ عرض الموقع
                        </a>
                        <button onClick={goToTinaMain} style={goldBtn}>
                            🚀 فتح TinaCMS
                        </button>
                    </div>
                </div>

                {/* Main */}
                <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>

                    {/* Welcome */}
                    <div style={{ marginBottom: 40 }}>
                        <h1 style={{
                            fontSize: 28, fontWeight: 700, color: '#1A1A1A',
                            margin: 0, lineHeight: 1.2,
                        }}>
                            أهلاً بك في لوحة التحكم 👋
                        </h1>
                        <p style={{ color: '#66727D', marginTop: 8, fontSize: 15 }}>
                            اختار القسم اللي عاوز تعدل عليه من الكروت أدناه
                        </p>
                    </div>

                    {/* Section Cards */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: 20,
                        marginBottom: 48,
                    }}>
                        {sections.map((s, i) => (
                            <div
                                key={i}
                                onClick={() => goToTina(s.tinaPath)}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    background: '#FFFFFF',
                                    borderRadius: 12,
                                    border: `2px solid ${hovered === i ? s.color : '#EAEAEA'}`,
                                    padding: '24px 20px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    transform: hovered === i ? 'translateY(-4px)' : 'none',
                                    boxShadow: hovered === i
                                        ? `0 12px 32px ${s.color}22`
                                        : '0 2px 8px rgba(0,0,0,0.06)',
                                }}
                            >
                                {/* Icon + Badge */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div style={{
                                        width: 52, height: 52,
                                        background: s.lightColor,
                                        borderRadius: 10,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 26,
                                    }}>
                                        {s.emoji}
                                    </div>
                                    <span style={{
                                        fontSize: 11, fontWeight: 600,
                                        color: s.color, background: s.lightColor,
                                        padding: '3px 10px', borderRadius: 20,
                                        letterSpacing: 0.5,
                                    }}>
                                        {s.subtitle}
                                    </span>
                                </div>

                                {/* Title + Desc */}
                                <h3 style={{
                                    fontSize: 17, fontWeight: 700,
                                    color: '#1A1A1A', margin: '0 0 6px',
                                }}>
                                    {s.title}
                                </h3>
                                <p style={{ fontSize: 13, color: '#66727D', margin: '0 0 16px', lineHeight: 1.5 }}>
                                    {s.desc}
                                </p>

                                {/* Details */}
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {s.details.map((d, j) => (
                                        <li key={j} style={{
                                            fontSize: 12, color: '#2F3439',
                                            padding: '3px 0',
                                            display: 'flex', alignItems: 'center', gap: 6,
                                        }}>
                                            <span style={{ color: s.color, fontSize: 10 }}>●</span> {d}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div style={{
                                    marginTop: 18,
                                    color: s.color, fontWeight: 600, fontSize: 13,
                                    display: 'flex', alignItems: 'center', gap: 4,
                                }}>
                                    تعديل ←
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Tips */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: 12,
                        border: '1px solid #EAEAEA',
                        padding: '24px 24px',
                        marginBottom: 32,
                    }}>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>
                            💡 نصايح مهمة
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: 12,
                        }}>
                            {quickTips.map((tip, i) => (
                                <div key={i} style={{
                                    background: '#F5F5F5',
                                    borderRadius: 8,
                                    padding: '10px 14px',
                                    display: 'flex', alignItems: 'flex-start', gap: 10,
                                }}>
                                    <span style={{ fontSize: 18 }}>{tip.icon}</span>
                                    <span style={{ fontSize: 13, color: '#2F3439', lineHeight: 1.5 }}>{tip.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* How-to Steps */}
                    <div style={{
                        background: '#FFFFFF',
                        borderRadius: 12,
                        border: '1px solid #EAEAEA',
                        padding: '24px 24px',
                    }}>
                        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', margin: '0 0 16px' }}>
                            🗺️ خطوات التعديل
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {[
                                { num: '1', text: 'اضغط على أيٌّ من الكروت فوق لفتح ذلك القسم في TinaCMS' },
                                { num: '2', text: 'عدّل أي حقل — النص، اللون، الصورة — وشوف التغيير على طول' },
                                { num: '3', text: 'اضغط "Save" في الأعلى لحفظ التغييرات' },
                                { num: '4', text: 'ارجع للموقع وشوف النتيجة فوراً 🎉' },
                            ].map(step => (
                                <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%',
                                        background: '#F2B705', color: '#1A1A1A',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: 15, flexShrink: 0,
                                    }}>
                                        {step.num}
                                    </div>
                                    <span style={{ color: '#2F3439', fontSize: 14 }}>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ textAlign: 'center', marginTop: 40, color: '#A0ACB7', fontSize: 12 }}>
                        Kynship Admin Dashboard — Built with ❤️
                    </div>
                </div>
            </div>
        </>
    );
}

// ── Styles ──
const goldBtn = {
    background: '#F2B705',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: 6,
    padding: '8px 18px',
    fontFamily: "'IBM Plex Arabic', sans-serif",
    fontWeight: 700,
    fontSize: 13,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6,
};

const outlineBtn = {
    background: 'transparent',
    color: '#FFFFFF',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: 6,
    padding: '8px 18px',
    fontFamily: "'IBM Plex Arabic', sans-serif",
    fontWeight: 500,
    fontSize: 13,
    cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 6,
    textDecoration: 'none',
};

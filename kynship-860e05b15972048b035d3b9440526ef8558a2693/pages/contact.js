import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Contact.module.css';
import { getRuntimeSettings } from '../lib/runtimeContent';
import { buildWhatsappUrl, normalizeWhatsappNumber } from '../lib/siteUtils';

const projectTypes = [
    'مطبخ',
    'غرفة ملابس',
    'وحدة تلفزيون',
    'تصميم خاص',
    'أخرى',
];

export default function ContactPage({ settings }) {
    const whatsappNumber = normalizeWhatsappNumber(settings?.whatsapp);
    const inquiryWhatsappLink = buildWhatsappUrl(whatsappNumber, 'مرحبا، أريد الاستفسار');
    const phone = settings?.phone || '+20 100 000 0000';
    const email = settings?.email || 'info@kynship.com';
    const location = settings?.location || 'الزقازيق، محافظة الشرقية، مصر';

    const [form, setForm] = useState({
        name: '',
        phone: '',
        message: '',
        projectType: '',
    });
    const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'يرجى إدخال الاسم';
        if (!form.phone.trim()) newErrors.phone = 'يرجى إدخال رقم الهاتف';
        if (!/^[\d\s\+\-]{7,15}$/.test(form.phone.trim())) newErrors.phone = 'رقم هاتف غير صحيح';
        if (!form.message.trim()) newErrors.message = 'يرجى كتابة رسالتك';
        if (!form.projectType) newErrors.projectType = 'يرجى اختيار نوع المشروع';
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setForm({ name: '', phone: '', message: '', projectType: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <>
            <Head>
                <title>تواصل معنا | كينشيب</title>
                <meta name="description" content="تواصل مع فريق كينشيب لطلب معاينة مجانية أو الاستفسار عن مشروعك." />
            </Head>

            <div className={styles.page}>
                <div className={styles.pageHeader}>
                    <div className="container">
                        <span className="section-label">تواصل معنا</span>
                        <h1 className={styles.pageTitle}>نحن هنا لنساعدك</h1>
                        <div className="gold-divider" />
                    </div>
                </div>

                <section className="section">
                    <div className="container">
                        <div className={styles.layout}>
                            {/* Form */}
                            <div className={styles.formWrap}>
                                {status === 'success' ? (
                                    <div className={styles.successMsg}>
                                        <span className={styles.successIcon}>✓</span>
                                        <h3>تم إرسال رسالتك بنجاح!</h3>
                                        <p>سيتواصل معك فريقنا في أقرب وقت ممكن.</p>
                                        <button
                                            className="btn-gold"
                                            onClick={() => setStatus(null)}
                                            style={{ marginTop: 24 }}
                                        >
                                            إرسال رسالة أخرى
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={styles.form} noValidate>
                                        <div className={styles.formRow}>
                                            <div className={styles.fieldGroup}>
                                                <label className={styles.label}>الاسم الكامل *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder="أدخل اسمك"
                                                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                                />
                                                {errors.name && <span className={styles.error}>{errors.name}</span>}
                                            </div>
                                            <div className={styles.fieldGroup}>
                                                <label className={styles.label}>رقم الهاتف *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                    placeholder="+20 100 000 0000"
                                                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                                                />
                                                {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                                            </div>
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <label className={styles.label}>نوع المشروع *</label>
                                            <select
                                                name="projectType"
                                                id="projectType"
                                                value={form.projectType}
                                                onChange={handleChange}
                                                className={`${styles.select} ${errors.projectType ? styles.inputError : ''}`}
                                            >
                                                <option value="">اختر نوع المشروع</option>
                                                {projectTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {errors.projectType && <span className={styles.error}>{errors.projectType}</span>}
                                        </div>

                                        <div className={styles.fieldGroup}>
                                            <label className={styles.label}>رسالتك *</label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                value={form.message}
                                                onChange={handleChange}
                                                placeholder="أخبرنا عن مشروعك وما تحتاجه..."
                                                rows={5}
                                                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                                            />
                                            {errors.message && <span className={styles.error}>{errors.message}</span>}
                                        </div>

                                        {status === 'error' && (
                                            <div className={styles.errorBanner}>
                                                حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            className="btn-gold"
                                            disabled={status === 'loading'}
                                            style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '16px' }}
                                        >
                                            {status === 'loading' ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                                        </button>
                                    </form>
                                )}
                            </div>

                            {/* Info */}
                            <aside className={styles.info}>
                                <div className={styles.infoCard}>
                                    <h3 className={styles.infoTitle}>معلومات التواصل</h3>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}>📍</span>
                                        <div>
                                            <strong>الموقع</strong>
                                            <p>{location}</p>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}>📞</span>
                                        <div>
                                            <strong>الهاتف</strong>
                                            <p>{phone}</p>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}>✉️</span>
                                        <div>
                                            <strong>البريد الإلكتروني</strong>
                                            <p>{email}</p>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}>🕐</span>
                                        <div>
                                            <strong>ساعات العمل</strong>
                                            <p>السبت – الخميس: 9ص – 8م</p>
                                        </div>
                                    </div>
                                </div>
                                <a
                                    href={inquiryWhatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gold"
                                    style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                                >
                                    تواصل عبر واتساب
                                </a>
                            </aside>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const settings = await getRuntimeSettings();

    return {
        props: { settings },
    };
}

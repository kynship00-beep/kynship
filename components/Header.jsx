import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsappUrl, normalizeWhatsappNumber } from '../lib/siteUtils';
import styles from './Header.module.css';

const MOBILE_MENU_MAX_WIDTH = 1024;

const AR_LABELS = {
    home: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
    portfolio: '\u0623\u0639\u0645\u0627\u0644\u0646\u0627',
    contact: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
    logo: '\u0643\u064a\u0646\u0634\u064a\u0628',
    whatsapp: '\u0648\u0627\u062a\u0633\u0627\u0628',
    menu: '\u0627\u0644\u0642\u0627\u0626\u0645\u0629',
    book: '\u0627\u062d\u062c\u0632 \u0645\u0639\u0627\u064a\u0646\u0629',
    bookFree: '\u0627\u062d\u062c\u0632 \u0645\u0639\u0627\u064a\u0646\u0629 \u0645\u062c\u0627\u0646\u064a\u0629',
};

export default function Header({ settings }) {
    const whatsappNumber = normalizeWhatsappNumber(settings?.whatsapp);
    const whatsappLink = buildWhatsappUrl(whatsappNumber);
    const bookLink = buildWhatsappUrl(whatsappNumber, AR_LABELS.bookFree);
    const brandName = settings?.brandName || 'Kynship';

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > MOBILE_MENU_MAX_WIDTH) {
                setMenuOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        { href: '/', label: AR_LABELS.home },
        { href: '/portfolio', label: AR_LABELS.portfolio },
        { href: '/contact', label: AR_LABELS.contact },
    ];

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        <span className={styles.logoText}>{brandName}</span>
                        <span className={styles.logoAr}>{AR_LABELS.logo}</span>
                    </Link>
                </div>

                <nav className={styles.desktopNav} aria-label="Main">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className={styles.desktopNavLink}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className={styles.actions}>
                    <a
                        href={bookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn-gold ${styles.desktopCta}`}
                    >
                        {AR_LABELS.bookFree}
                    </a>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappBtn}
                        aria-label={AR_LABELS.whatsapp}
                    >
                        <FaWhatsapp size={22} />
                    </a>

                    <button
                        type="button"
                        className={styles.menuBtn}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label={AR_LABELS.menu}
                    >
                        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            <nav id="mobile-nav" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
                <div className={styles.navInner}>
                    <button
                        type="button"
                        className={styles.closeBtn}
                        onClick={() => setMenuOpen(false)}
                        aria-label={AR_LABELS.menu}
                    >
                        <FiX size={28} />
                    </button>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className={styles.navDivider} />
                    <a
                        href={bookLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold"
                        onClick={() => setMenuOpen(false)}
                    >
                        {AR_LABELS.bookFree}
                    </a>
                </div>
            </nav>

            {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
        </header>
    );
}

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
    const brandName = settings?.brandName || 'Kynship';

    // Use settings from CMS or fallback to defaults
    const headerSettings = settings?.header || {};
    const logoText = headerSettings.logoText || brandName;
    const logoAr = headerSettings.logoAr || '\u0643\u064a\u0646\u0634\u064a\u0628';
    const ctaLabel = headerSettings.ctaLabel || '\u0627\u062d\u062c\u0632 \u0645\u063a\u0627\u064a\u0646\u0629 \u0645\u062c\u0627\u0646\u064a\u0629';
    const navLinks = headerSettings.navLinks || [
        { href: '/', label: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629' },
        { href: '/portfolio', label: '\u0623\u0639\u0645\u0627\u0644\u0646\u0627' },
        { href: '/contact', label: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627' },
    ];

    const headerBg = headerSettings.headerBg;
    const logoColor = headerSettings.logoColor;
    const logoArColor = headerSettings.logoArColor;
    const navLinkColor = headerSettings.navLinkColor;
    const ctaBg = headerSettings.ctaBg;
    const ctaTextColor = headerSettings.ctaTextColor;

    const bookLink = buildWhatsappUrl(whatsappNumber, ctaLabel);

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

    const headerStyle = {
        ...(scrolled && headerBg ? { backgroundColor: headerBg } : {}),
        ...(!scrolled && headerBg ? { backgroundColor: headerBg } : {}), // Apply even if not scrolled if defined
    };

    const logoStyle = {
        ...(logoColor ? { color: logoColor } : {}),
        ...(headerSettings.logoEnSize ? { fontSize: `${headerSettings.logoEnSize}px` } : {}),
        ...(headerSettings.logoFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const logoArStyle = {
        ...(logoArColor ? { color: logoArColor } : {}),
        ...(headerSettings.logoArSize ? { fontSize: `${headerSettings.logoArSize}px` } : {}),
        ...(headerSettings.logoFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const navLinkStyle = {
        ...(navLinkColor ? { color: navLinkColor } : {}),
        ...(headerSettings.navLinkSize ? { fontSize: `${headerSettings.navLinkSize}px` } : {}),
        ...(headerSettings.navLinkFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };
    const ctaStyle = {
        ...(ctaBg ? { backgroundColor: ctaBg, borderColor: ctaBg } : {}),
        ...(ctaTextColor ? { color: ctaTextColor } : {}),
        ...(headerSettings.ctaFontSize ? { fontSize: `${headerSettings.ctaFontSize}px` } : {}),
        ...(headerSettings.ctaFont === 'CustomFont' ? { fontFamily: "'CustomFont', sans-serif" } : {}),
    };

    const logoImage = headerSettings.logoImage;

    return (
        <header
            className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
            style={headerStyle}
        >
            <div className={`container ${styles.inner}`}>
                <div className={styles.logo}>
                    <Link href="/">
                        {logoImage ? (
                            <img src={logoImage} alt={brandName} className={styles.logoImg} />
                        ) : (
                            <>
                                <span className={styles.logoText} style={logoStyle}>{logoText}</span>
                                <span className={styles.logoAr} style={logoArStyle}>{logoAr}</span>
                            </>
                        )}
                    </Link>
                </div>

                <nav className={styles.desktopNav} aria-label="Main">
                    {navLinks.map((link, index) => (
                        <Link
                            key={`${link.href}-${index}`}
                            href={link.href}
                            className={styles.desktopNavLink}
                            style={navLinkStyle}
                        >
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
                        style={ctaStyle}
                    >
                        {ctaLabel}
                    </a>

                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappBtn}
                        aria-label="\u0648\u0627\u062a\u0633\u0627\u0628"
                    >
                        <FaWhatsapp size={22} />
                    </a>

                    <button
                        type="button"
                        className={styles.menuBtn}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-nav"
                        aria-label="\u0627\u0644\u0642\u0627\u0626\u0645\u0629"
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
                        aria-label="\u0627\u0644\u0642\u0627\u0626\u0645\u0629"
                    >
                        <FiX size={28} />
                    </button>
                    {navLinks.map((link, index) => (
                        <Link
                            key={`${link.href}-${index}`}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setMenuOpen(false)}
                            style={navLinkStyle}
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
                        style={ctaStyle}
                    >
                        {ctaLabel}
                    </a>
                </div>
            </nav>

            {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} />}
        </header>
    );
}

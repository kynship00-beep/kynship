import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTiktok, FaPinterest } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { MdLocationOn, MdPhone, MdEmail } from 'react-icons/md';
import { buildWhatsappUrl, normalizeWhatsappNumber } from '../lib/siteUtils';
import styles from './Footer.module.css';

const AR = {
    logo: '\u0643\u064a\u0646\u0634\u064a\u0628',
    tagline: '\u0646\u0635\u0645\u0645 \u0645\u0633\u0627\u062d\u062a\u0643 \u0628\u062f\u0642\u0629 \u0641\u064a \u0643\u0644 \u062a\u0641\u0635\u064a\u0644\u0629',
    quickLinks: '\u0631\u0648\u0627\u0628\u0637 \u0633\u0631\u064a\u0639\u0629',
    home: '\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629',
    portfolio: '\u0623\u0639\u0645\u0627\u0644\u0646\u0627',
    contact: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
    contactTitle: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
    follow: '\u062a\u0627\u0628\u0639\u0646\u0627',
    rights: '\u062c\u0645\u064a\u0639 \u0627\u0644\u062d\u0642\u0648\u0642 \u0645\u062d\u0641\u0648\u0638\u0629.',
};

export default function Footer({ settings }) {
    const brandName = settings?.brandName || 'Kynship';
    const phone = settings?.phone || '+20 100 000 0000';
    const email = settings?.email || 'info@kynship.com';
    const location =
        settings?.location ||
        '\u0627\u0644\u0632\u0642\u0627\u0632\u064a\u0642\u060c \u0645\u062d\u0627\u0641\u0638\u0629 \u0627\u0644\u0634\u0631\u0642\u064a\u0629\u060c \u0645\u0635\u0631';
    const whatsappUrl = buildWhatsappUrl(normalizeWhatsappNumber(settings?.whatsapp));
    const instagram = settings?.instagram || 'https://instagram.com';
    const facebook = settings?.facebook || 'https://facebook.com';
    const tiktok = settings?.tiktok;
    const twitter = settings?.twitter;
    const pinterest = settings?.pinterest;

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.inner}`}>
                <div className={styles.brand}>
                    <div className={styles.logoText}>{brandName}</div>
                    <div className={styles.logoAr}>{AR.logo}</div>
                    <p className={styles.tagline}>{AR.tagline}</p>
                </div>

                <div className={styles.links}>
                    <h4 className={styles.colTitle}>{AR.quickLinks}</h4>
                    <Link href="/">{AR.home}</Link>
                    <Link href="/portfolio">{AR.portfolio}</Link>
                    <Link href="/contact">{AR.contact}</Link>
                </div>

                <div className={styles.contact}>
                    <h4 className={styles.colTitle}>{AR.contactTitle}</h4>
                    <div className={styles.contactItem}>
                        <MdLocationOn size={18} />
                        <span>{location}</span>
                    </div>
                    <div className={styles.contactItem}>
                        <MdPhone size={18} />
                        <span>{phone}</span>
                    </div>
                    <div className={styles.contactItem}>
                        <MdEmail size={18} />
                        <span>{email}</span>
                    </div>
                </div>

                <div className={styles.social}>
                    <h4 className={styles.colTitle}>{AR.follow}</h4>
                    <div className={styles.socialIcons}>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <FaWhatsapp size={20} />
                        </a>
                        <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram size={20} />
                        </a>
                        <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebookF size={20} />
                        </a>

                        <a href={tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                            <FaTiktok size={20} />
                        </a>


                        <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                            <FaXTwitter size={20} />
                        </a>


                        <a href={pinterest} target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
                            <FaPinterest size={20} />
                        </a>

                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className="container">
                    <p>
                        {'\u00A9'} {new Date().getFullYear()} {brandName}. {AR.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}

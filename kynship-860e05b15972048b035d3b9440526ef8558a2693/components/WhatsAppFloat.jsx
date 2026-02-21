import { FaWhatsapp } from 'react-icons/fa';
import { buildWhatsappUrl, normalizeWhatsappNumber } from '../lib/siteUtils';
import styles from './WhatsAppFloat.module.css';

const AR = {
    label: '\u062a\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062a\u0633\u0627\u0628',
    tooltip: '\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627',
    inquiry: '\u0645\u0631\u062d\u0628\u0627\u060c \u0623\u0631\u064a\u062f \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u062e\u062f\u0645\u0627\u062a\u0643\u0645',
};

export default function WhatsAppFloat({ settings }) {
    const whatsappNumber = normalizeWhatsappNumber(settings?.whatsapp);
    const whatsappLink = buildWhatsappUrl(whatsappNumber, AR.inquiry);

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.floatBtn}
            aria-label={AR.label}
        >
            <FaWhatsapp size={28} />
            <span className={styles.tooltip}>{AR.tooltip}</span>
        </a>
    );
}

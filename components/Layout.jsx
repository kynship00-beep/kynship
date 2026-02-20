import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function Layout({ children, settings }) {
    return (
        <>
            <Header settings={settings} />
            <main>{children}</main>
            <Footer settings={settings} />
            <WhatsAppFloat settings={settings} />
        </>
    );
}

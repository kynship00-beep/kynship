import Header from './Header';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

export default function Layout({ children, settings }) {
  const customFontUrl = settings?.customFont;

  return (
    <>
      {customFontUrl && (
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'CustomFont';
              src: url('${customFontUrl}') format('truetype');
              font-display: swap;
            }
          `
        }} />
      )}
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat settings={settings} />
    </>
  );
}

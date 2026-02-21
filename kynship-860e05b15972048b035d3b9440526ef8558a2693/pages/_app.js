import '../styles/globals.css';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
    return (
        <Layout settings={pageProps?.settings}>
            <Component {...pageProps} />
        </Layout>
    );
}

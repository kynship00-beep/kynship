import '../styles/globals.css';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
    const router = useRouter();
    // Skip global Layout for admin page
    const isAdmin = router.pathname === '/admin';
    if (isAdmin) {
        return <Component {...pageProps} />;
    }
    return (
        <Layout settings={pageProps?.settings}>
            <Component {...pageProps} />
        </Layout>
    );
}

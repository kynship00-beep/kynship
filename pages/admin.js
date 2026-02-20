import { useEffect } from 'react';

export default function AdminPage() {
    useEffect(() => {
        // Use Tina dev UI locally, static admin bundle in production.
        if (process.env.NODE_ENV === 'development') {
            window.location.href = 'http://localhost:4001';
            return;
        }
        window.location.href = '/admin/index.html';
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'IBM Plex Arabic, sans-serif',
            background: '#F5F5F5',
        }}>
            <div style={{ textAlign: 'center', color: '#2F3439' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 12, color: '#234A68' }}>
                    Kynship Admin
                </div>
                <p style={{ color: '#66727D' }}>جاري التوجيه إلى لوحة الإدارة...</p>
            </div>
        </div>
    );
}

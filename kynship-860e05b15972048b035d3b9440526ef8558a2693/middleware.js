import { NextResponse } from 'next/server';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'kynship';

function unauthorized() {
    return new NextResponse('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Kynship Admin", charset="UTF-8"',
        },
    });
}

export function middleware(request) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return unauthorized();
    }

    const encoded = authHeader.split(' ')[1];
    let decoded = '';
    try {
        decoded = atob(encoded);
    } catch {
        return unauthorized();
    }

    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex === -1) {
        return unauthorized();
    }

    const username = decoded.slice(0, separatorIndex);
    const password = decoded.slice(separatorIndex + 1);

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        return unauthorized();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};

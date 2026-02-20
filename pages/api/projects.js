import { getRuntimeProjects } from '../../lib/runtimeContent';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    try {
        const projects = await getRuntimeProjects();

        return res.status(200).json({ success: true, projects });
    } catch (err) {
        console.error('Projects API error:', err);
        return res.status(500).json({ success: false, message: 'Failed to load projects' });
    }
}

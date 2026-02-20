import fs from 'fs';
import path from 'path';
import { loadReviews, loadSettings } from './siteContent';

const TINA_GRAPHQL_VERSION = process.env.TINA_GRAPHQL_VERSION || '1.6';
const DEFAULT_BRANCH = 'main';

const SETTINGS_QUERY = `
  query SettingsQuery {
    settings(relativePath: "index.json") {
      brandName
      phone
      email
      location
      whatsapp
      instagram
      facebook
      goldColor
    }
  }
`;

const REVIEWS_QUERY = `
  query ReviewsQuery {
    reviewConnection(first: 500) {
      edges {
        node {
          _sys {
            filename
          }
          name
          location
          rating
          quote
        }
      }
    }
  }
`;

const HOMEPAGE_QUERY = `
  query HomepageQuery {
    homepage(relativePath: "index.json") {
      hero {
        badge
        headline
        accent
        subtext
        primaryCtaText
        primaryCtaLink
        secondaryCtaText
        secondaryCtaLink
        backgroundImage
      }
      categories {
        label
        title
        subtitle
        items {
          title
          subtitle
          href
          bg
          image
        }
      }
      trust {
        label
        title
        items {
          icon
          title
          desc
        }
      }
      studio {
        label
        title
        text
        features
        ctaText
        ctaLink
      }
      cta {
        label
        title
        subtitle
        primaryText
        primaryLink
        secondaryText
        secondaryLink
      }
    }
  }
`;

const PROJECTS_QUERY = `
  query ProjectsQuery {
    projectConnection(first: 500) {
      edges {
        node {
          _sys {
            filename
          }
          title
          description
          category
          completionDate
          images
        }
      }
    }
  }
`;

const PROJECT_BY_ID_QUERY = `
  query ProjectByIdQuery($relativePath: String!) {
    project(relativePath: $relativePath) {
      _sys {
        filename
      }
      title
      description
      category
      completionDate
      images
    }
  }
`;

function getBranchName() {
    return (
        process.env.NEXT_PUBLIC_TINA_BRANCH ||
        process.env.VERCEL_GIT_COMMIT_REF ||
        process.env.HEAD ||
        DEFAULT_BRANCH
    );
}

function getTinaRuntimeConfig() {
    return {
        clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim(),
        token: process.env.TINA_TOKEN?.trim(),
        branch: getBranchName(),
    };
}

export function hasTinaRuntimeConfig() {
    const { clientId, token } = getTinaRuntimeConfig();
    return Boolean(clientId && token);
}

function readJsonFile(filePath) {
    try {
        if (!fs.existsSync(filePath)) return null;
        const raw = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function loadHomepageFromFile() {
    const homepagePath = path.join(process.cwd(), 'content', 'homepage', 'index.json');
    return readJsonFile(homepagePath);
}

function loadProjectsFromFile() {
    const projectsDir = path.join(process.cwd(), 'content', 'projects');
    if (!fs.existsSync(projectsDir)) return [];

    return fs
        .readdirSync(projectsDir)
        .filter((file) => file.endsWith('.json'))
        .sort((a, b) => a.localeCompare(b))
        .map((file) => {
            const raw = readJsonFile(path.join(projectsDir, file));
            if (!raw) return null;
            return normalizeProject(raw, 0, file.replace(/\.json$/i, ''));
        })
        .filter(Boolean);
}

function loadProjectByIdFromFile(projectId) {
    const projectPath = path.join(process.cwd(), 'content', 'projects', `${projectId}.json`);
    const raw = readJsonFile(projectPath);
    if (!raw) return null;
    return normalizeProject(raw, 0, projectId);
}

function cleanProjectId(value, fallback) {
    const selected = String(value || fallback || '').trim();
    const withoutExt = selected.replace(/\.json$/i, '');
    return withoutExt || String(fallback || '').trim();
}

function normalizeProject(node, index = 0, explicitId = '') {
    const derivedId = cleanProjectId(
        explicitId || node?._sys?.filename,
        `project-${index + 1}`
    );

    return {
        id: derivedId,
        title: node?.title || '',
        description: node?.description || '',
        category: node?.category || '',
        completionDate: node?.completionDate || '',
        images: Array.isArray(node?.images) ? node.images.filter(Boolean) : [],
    };
}

function compareById(a, b) {
    return String(a.id).localeCompare(String(b.id), undefined, {
        numeric: true,
        sensitivity: 'base',
    });
}

async function tinaRequest(query, variables = {}) {
    const { clientId, token, branch } = getTinaRuntimeConfig();
    if (!clientId || !token) {
        throw new Error('Missing Tina runtime credentials');
    }

    const url = `https://content.tinajs.io/${TINA_GRAPHQL_VERSION}/content/${clientId}/github/${branch}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': token,
        },
        body: JSON.stringify({ query, variables }),
        cache: 'no-store',
    });

    if (!response.ok) {
        const body = await response.text();
        throw new Error(`Tina request failed with ${response.status}: ${body.slice(0, 240)}`);
    }

    const payload = await response.json();
    if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
        const messages = payload.errors.map((error) => error?.message || 'Unknown Tina error').join(' | ');
        throw new Error(messages);
    }

    return payload?.data || null;
}

export async function getRuntimeSettings() {
    const fallback = loadSettings();
    if (!hasTinaRuntimeConfig()) return fallback;

    try {
        const data = await tinaRequest(SETTINGS_QUERY);
        return { ...fallback, ...(data?.settings || {}) };
    } catch (error) {
        console.error('Tina runtime settings fetch failed:', error.message);
        return fallback;
    }
}

export async function getRuntimeReviews() {
    const fallback = loadReviews();
    if (!hasTinaRuntimeConfig()) return fallback;

    try {
        const data = await tinaRequest(REVIEWS_QUERY);
        const reviews = (data?.reviewConnection?.edges || [])
            .map((edge, index) => {
                const node = edge?.node;
                if (!node) return null;
                const id = cleanProjectId(node?._sys?.filename, `review-${index + 1}`);
                return {
                    id,
                    name: node.name || '',
                    location: node.location || '',
                    rating: Number(node.rating) || 5,
                    quote: node.quote || '',
                };
            })
            .filter(Boolean)
            .sort(compareById);

        return reviews.length > 0 ? reviews : fallback;
    } catch (error) {
        console.error('Tina runtime reviews fetch failed:', error.message);
        return fallback;
    }
}

export async function getRuntimeHomepage() {
    const fallback = loadHomepageFromFile();
    if (!hasTinaRuntimeConfig()) return fallback;

    try {
        const data = await tinaRequest(HOMEPAGE_QUERY);
        return data?.homepage || fallback;
    } catch (error) {
        console.error('Tina runtime homepage fetch failed:', error.message);
        return fallback;
    }
}

export async function getRuntimeProjects() {
    const fallback = loadProjectsFromFile();
    if (!hasTinaRuntimeConfig()) return fallback;

    try {
        const data = await tinaRequest(PROJECTS_QUERY);
        const projects = (data?.projectConnection?.edges || [])
            .map((edge, index) => normalizeProject(edge?.node, index))
            .filter((project) => Boolean(project?.id))
            .sort(compareById);

        return projects.length > 0 ? projects : fallback;
    } catch (error) {
        console.error('Tina runtime projects fetch failed:', error.message);
        return fallback;
    }
}

function sanitizeProjectId(id) {
    return String(id || '')
        .trim()
        .replace(/[^a-zA-Z0-9_-]/g, '');
}

export async function getRuntimeProjectById(id) {
    const safeId = sanitizeProjectId(id);
    if (!safeId) return null;

    const fallback = loadProjectByIdFromFile(safeId);
    if (!hasTinaRuntimeConfig()) return fallback;

    try {
        const data = await tinaRequest(PROJECT_BY_ID_QUERY, {
            relativePath: `${safeId}.json`,
        });
        if (!data?.project) return fallback;
        return normalizeProject(data.project, 0, safeId);
    } catch (error) {
        console.error('Tina runtime project fetch failed:', error.message);
        return fallback;
    }
}

import { defineConfig } from 'tinacms';

export default defineConfig({
    branch: process.env.NEXT_PUBLIC_TINA_BRANCH || 'main',
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '00000000-0000-0000-0000-000000000000',
    token: process.env.TINA_TOKEN || 'dummy_token',

    build: {
        outputFolder: 'admin',
        publicFolder: 'public',
    },

    media: {
        tina: {
            mediaRoot: 'images',
            publicFolder: 'public',
        },
    },

    schema: {
        collections: [
            {
                name: 'homepage',
                label: 'Homepage',
                path: 'content/homepage',
                format: 'json',
                ui: {
                    global: true,
                    allowedActions: { create: false, delete: false },
                    filename: {
                        readonly: true,
                        slugify: () => 'index',
                    },
                },
                fields: [
                    {
                        type: 'object',
                        name: 'hero',
                        label: 'Hero Section',
                        fields: [
                            { type: 'string', name: 'badge', label: 'Badge' },
                            { type: 'string', name: 'headline', label: 'Headline' },
                            { type: 'string', name: 'accent', label: 'Headline Accent' },
                            { type: 'string', name: 'subtext', label: 'Subtext' },
                            { type: 'string', name: 'primaryCtaText', label: 'Primary CTA Text' },
                            { type: 'string', name: 'primaryCtaLink', label: 'Primary CTA Link' },
                            { type: 'string', name: 'secondaryCtaText', label: 'Secondary CTA Text' },
                            { type: 'string', name: 'secondaryCtaLink', label: 'Secondary CTA Link' },
                            { type: 'image', name: 'backgroundImage', label: 'Background Image' },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'categories',
                        label: 'Categories Section',
                        fields: [
                            { type: 'string', name: 'label', label: 'Section Label' },
                            { type: 'string', name: 'title', label: 'Section Title' },
                            { type: 'string', name: 'subtitle', label: 'Section Subtitle' },
                            {
                                type: 'object',
                                name: 'items',
                                label: 'Category Items',
                                list: true,
                                fields: [
                                    { type: 'string', name: 'title', label: 'Title' },
                                    { type: 'string', name: 'subtitle', label: 'Subtitle' },
                                    { type: 'string', name: 'href', label: 'Link' },
                                    { type: 'string', name: 'bg', label: 'Fallback Background Color (Hex)' },
                                    { type: 'image', name: 'image', label: 'Image' },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'trust',
                        label: 'Trust Section',
                        fields: [
                            { type: 'string', name: 'label', label: 'Section Label' },
                            { type: 'string', name: 'title', label: 'Section Title' },
                            {
                                type: 'object',
                                name: 'items',
                                label: 'Trust Items',
                                list: true,
                                fields: [
                                    { type: 'string', name: 'icon', label: 'Icon (emoji/text)' },
                                    { type: 'string', name: 'title', label: 'Title' },
                                    {
                                        type: 'string',
                                        name: 'desc',
                                        label: 'Description',
                                        ui: { component: 'textarea' },
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'studio',
                        label: 'Studio Section',
                        fields: [
                            { type: 'string', name: 'label', label: 'Section Label' },
                            { type: 'string', name: 'title', label: 'Section Title' },
                            {
                                type: 'string',
                                name: 'text',
                                label: 'Description',
                                ui: { component: 'textarea' },
                            },
                            {
                                type: 'string',
                                name: 'features',
                                label: 'Feature List',
                                list: true,
                            },
                            { type: 'string', name: 'ctaText', label: 'CTA Text' },
                            { type: 'string', name: 'ctaLink', label: 'CTA Link' },
                        ],
                    },
                    {
                        type: 'object',
                        name: 'cta',
                        label: 'Bottom CTA Section',
                        fields: [
                            { type: 'string', name: 'label', label: 'Section Label' },
                            { type: 'string', name: 'title', label: 'Section Title' },
                            {
                                type: 'string',
                                name: 'subtitle',
                                label: 'Section Subtitle',
                                ui: { component: 'textarea' },
                            },
                            { type: 'string', name: 'primaryText', label: 'Primary Button Text' },
                            { type: 'string', name: 'primaryLink', label: 'Primary Button Link' },
                            { type: 'string', name: 'secondaryText', label: 'Secondary Button Text' },
                            { type: 'string', name: 'secondaryLink', label: 'Secondary Button Link' },
                        ],
                    },
                ],
            },
            {
                name: 'project',
                label: 'Projects',
                path: 'content/projects',
                format: 'json',
                fields: [
                    {
                        type: 'string',
                        name: 'title',
                        label: 'Project Title',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'string',
                        name: 'description',
                        label: 'Description',
                        ui: { component: 'textarea' },
                    },
                    {
                        type: 'string',
                        name: 'category',
                        label: 'Category',
                        options: ['مطابخ', 'غرف ملابس', 'وحدات تلفزيون', 'تصميمات خاصة'],
                    },
                    {
                        type: 'string',
                        name: 'completionDate',
                        label: 'Completion Date',
                    },
                    {
                        type: 'image',
                        name: 'images',
                        label: 'Images',
                        list: true,
                    },
                ],
            },
            {
                name: 'review',
                label: 'Reviews',
                path: 'content/reviews',
                format: 'json',
                fields: [
                    {
                        type: 'string',
                        name: 'name',
                        label: 'Client Name',
                        isTitle: true,
                        required: true,
                    },
                    {
                        type: 'string',
                        name: 'location',
                        label: 'Location',
                    },
                    {
                        type: 'number',
                        name: 'rating',
                        label: 'Rating (1-5)',
                    },
                    {
                        type: 'string',
                        name: 'quote',
                        label: 'Quote',
                        ui: { component: 'textarea' },
                    },
                ],
            },
            {
                name: 'settings',
                label: 'Settings',
                path: 'content/settings',
                format: 'json',
                ui: {
                    global: true,
                    allowedActions: { create: false, delete: false },
                    filename: {
                        readonly: true,
                        slugify: () => 'index',
                    },
                },
                fields: [
                    { type: 'string', name: 'brandName', label: 'Brand Name' },
                    { type: 'string', name: 'phone', label: 'Phone' },
                    { type: 'string', name: 'email', label: 'Email' },
                    { type: 'string', name: 'location', label: 'Location' },
                    { type: 'string', name: 'whatsapp', label: 'WhatsApp Number' },
                    { type: 'string', name: 'instagram', label: 'Instagram Link' },
                    { type: 'string', name: 'facebook', label: 'Facebook Link' },
                    { type: 'string', name: 'tiktok', label: 'TikTok Link' },
                    { type: 'string', name: 'twitter', label: 'X (Twitter) Link' },
                    { type: 'string', name: 'pinterest', label: 'Pinterest Link' },
                    { type: 'string', name: 'goldColor', label: 'Accent Color' },
                ],
            },
        ],
    },
});

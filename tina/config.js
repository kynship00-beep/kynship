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
            // ─────────────────────────────────────────
            // 🏠 HOMEPAGE
            // ─────────────────────────────────────────
            {
                name: 'homepage',
                label: '🏠 الصفحة الرئيسية',
                path: 'content/homepage',
                format: 'json',
                ui: {
                    global: true,
                    allowedActions: { create: false, delete: false },
                    filename: { readonly: true, slugify: () => 'index' },
                },
                fields: [
                    // ── Hero ──
                    {
                        type: 'object',
                        name: 'hero',
                        label: '🎯 قسم الهيرو (أول الصفحة)',
                        fields: [
                            { type: 'string', name: 'badge', label: '🏷️ الشارة العلوية' },
                            { type: 'string', name: 'headline', label: '✍️ العنوان الرئيسي' },
                            { type: 'string', name: 'accent', label: '✨ الكلمة المميزة (الذهبية)' },
                            { type: 'string', name: 'subtext', label: '📝 الجملة التوضيحية', ui: { component: 'textarea' } },
                            { type: 'image', name: 'backgroundImage', label: '🖼️ صورة الخلفية' },
                            { type: 'string', name: 'primaryCtaText', label: '🟡 نص الزر الرئيسي' },
                            { type: 'string', name: 'primaryCtaLink', label: '🔗 رابط الزر الرئيسي' },
                            { type: 'string', name: 'secondaryCtaText', label: '⬜ نص الزر الثانوي' },
                            { type: 'string', name: 'secondaryCtaLink', label: '🔗 رابط الزر الثانوي' },
                            // Styling (FLAT)
                            { type: 'string', name: 'badgeBg', label: '🎨 خلفية الشارة', ui: { component: 'color' } },
                            { type: 'string', name: 'badgeText', label: '🎨 لون نص الشارة', ui: { component: 'color' } },
                            { type: 'number', name: 'badgeSize', label: '📏 حجم خط الشارة (px)' },
                            { type: 'string', name: 'headlineColor', label: '🎨 لون العنوان', ui: { component: 'color' } },
                            { type: 'number', name: 'headlineSize', label: '📏 حجم خط العنوان (px)' },
                            { type: 'string', name: 'accentColor', label: '🎨 لون الكلمة المميزة', ui: { component: 'color' } },
                            { type: 'string', name: 'subtextColor', label: '🎨 لون الجملة التوضيحية', ui: { component: 'color' } },
                            { type: 'number', name: 'subtextSize', label: '📏 حجم خط الجملة (px)' },
                            { type: 'string', name: 'primaryBtnBg', label: '🎨 خلفية الزر الرئيسي', ui: { component: 'color' } },
                            { type: 'string', name: 'primaryBtnText', label: '🎨 لون نص الزر الرئيسي', ui: { component: 'color' } },
                            { type: 'string', name: 'secondaryBtnBorder', label: '🎨 حدود الزر الثانوي', ui: { component: 'color' } },
                            { type: 'string', name: 'secondaryBtnText', label: '🎨 لون نص الزر الثانوي', ui: { component: 'color' } },
                            { type: 'string', name: 'overlayColor', label: '🎨 لون الطبقة الشفافة', ui: { component: 'color' } },
                            { type: 'number', name: 'overlayOpacity', label: '🌓 شفافية الطبقة (0-1)' },
                        ],
                    },
                    // ── Categories ──
                    {
                        type: 'object',
                        name: 'categories',
                        label: '🗂️ قسم الخدمات / الأقسام',
                        fields: [
                            { type: 'string', name: 'label', label: '🏷️ العنوان الصغير' },
                            { type: 'string', name: 'title', label: '✍️ العنوان الرئيسي' },
                            { type: 'string', name: 'subtitle', label: '📝 الوصف', ui: { component: 'textarea' } },
                            {
                                type: 'object',
                                name: 'items',
                                label: '📦 بطاقات الخدمات',
                                list: true,
                                ui: { itemProps: (item) => ({ label: `📦 ${item?.title || 'خدمة جديدة'}` }) },
                                fields: [
                                    { type: 'string', name: 'title', label: '✍️ اسم الخدمة' },
                                    { type: 'string', name: 'subtitle', label: '📝 وصف فرعي' },
                                    { type: 'string', name: 'href', label: '🔗 الرابط' },
                                    { type: 'image', name: 'image', label: '🖼️ الصورة' },
                                ],
                            },
                            // Styling (FLAT)
                            { type: 'string', name: 'sectionBg', label: '🎨 خلفية القسم', ui: { component: 'color' } },
                            { type: 'string', name: 'labelColor', label: '🎨 لون العنوان الصغير', ui: { component: 'color' } },
                            { type: 'number', name: 'labelSize', label: '📏 حجم خط العنوان الصغير (px)' },
                            { type: 'string', name: 'titleColor', label: '🎨 لون العنوان الرئيسي', ui: { component: 'color' } },
                            { type: 'number', name: 'titleSize', label: '📏 حجم خط العنوان الرئيسي (px)' },
                            { type: 'string', name: 'subtitleColor', label: '🎨 لون الوصف', ui: { component: 'color' } },
                            { type: 'number', name: 'subtitleSize', label: '📏 حجم خط الوصف (px)' },
                            { type: 'string', name: 'cardBg', label: '🎨 خلفية البطاقة', ui: { component: 'color' } },
                            { type: 'string', name: 'cardTitleColor', label: '🎨 لون عنوان البطاقة', ui: { component: 'color' } },
                            { type: 'string', name: 'cardSubColor', label: '🎨 لون وصف البطاقة', ui: { component: 'color' } },
                        ],
                    },
                    // ── Trust ──
                    {
                        type: 'object',
                        name: 'trust',
                        label: '✅ قسم المميزات',
                        fields: [
                            { type: 'string', name: 'label', label: '🏷️ العنوان الصغير' },
                            { type: 'string', name: 'title', label: '✍️ العنوان الرئيسي' },
                            {
                                type: 'object',
                                name: 'items',
                                label: '⭐ المميزات',
                                list: true,
                                ui: { itemProps: (item) => ({ label: `${item?.icon || '⭐'} ${item?.title || 'ميزة جديدة'}` }) },
                                fields: [
                                    { type: 'string', name: 'icon', label: '🎭 الأيقونة (Emoji)' },
                                    { type: 'string', name: 'title', label: '✍️ العنوان' },
                                    { type: 'string', name: 'desc', label: '📝 الوصف', ui: { component: 'textarea' } },
                                ],
                            },
                            // Styling (FLAT)
                            { type: 'string', name: 'sectionBg', label: '🎨 خلفية القسم', ui: { component: 'color' } },
                            { type: 'string', name: 'labelColor', label: '🎨 لون العنوان الصغير', ui: { component: 'color' } },
                            { type: 'number', name: 'labelSize', label: '📏 حجم خط العنوان الصغير (px)' },
                            { type: 'string', name: 'titleColor', label: '🎨 لون العنوان الرئيسي', ui: { component: 'color' } },
                            { type: 'number', name: 'titleSize', label: '📏 حجم خط العنوان الرئيسي (px)' },
                            { type: 'string', name: 'cardBg', label: '🎨 خلفية البطاقة', ui: { component: 'color' } },
                            { type: 'string', name: 'cardTitleColor', label: '🎨 لون عنوان البطاقة', ui: { component: 'color' } },
                            { type: 'string', name: 'cardDescColor', label: '🎨 لون وصف البطاقة', ui: { component: 'color' } },
                            { type: 'string', name: 'iconColor', label: '🎨 لون الأيقونة', ui: { component: 'color' } },
                            { type: 'string', name: 'iconBg', label: '🎨 خلفية الأيقونة', ui: { component: 'color' } },
                        ],
                    },
                    // ── Studio ──
                    {
                        type: 'object',
                        name: 'studio',
                        label: '🎨 قسم الاستوديو',
                        fields: [
                            { type: 'string', name: 'label', label: '🏷️ العنوان الصغير' },
                            { type: 'string', name: 'title', label: '✍️ العنوان الرئيسي' },
                            { type: 'string', name: 'text', label: '📝 النص', ui: { component: 'textarea' } },
                            { type: 'string', name: 'features', label: '✨ قائمة المميزات', list: true },
                            { type: 'image', name: 'images', label: '🖼️ صور المعرض', list: true },
                            { type: 'string', name: 'ctaText', label: '🟡 نص الزر' },
                            { type: 'string', name: 'ctaLink', label: '🔗 الرابط' },
                            // Styling (FLAT)
                            { type: 'string', name: 'sectionBg', label: '🎨 خلفية القسم', ui: { component: 'color' } },
                            { type: 'string', name: 'labelColor', label: '🎨 لون العنوان الصغير', ui: { component: 'color' } },
                            { type: 'number', name: 'labelSize', label: '📏 حجم خط العنوان الصغير (px)' },
                            { type: 'string', name: 'titleColor', label: '🎨 لون العنوان', ui: { component: 'color' } },
                            { type: 'number', name: 'titleSize', label: '📏 حجم خط العنوان (px)' },
                            { type: 'string', name: 'textColor', label: '🎨 لون النص الرئيسي', ui: { component: 'color' } },
                            { type: 'number', name: 'textSize', label: '📏 حجم خط النص (px)' },
                            { type: 'string', name: 'featureIconColor', label: '🎨 لون أيقونة الميزة', ui: { component: 'color' } },
                            { type: 'string', name: 'featureTextColor', label: '🎨 لون نص الميزات', ui: { component: 'color' } },
                            { type: 'string', name: 'ctaBg', label: '🎨 خلفية الزر', ui: { component: 'color' } },
                            { type: 'string', name: 'ctaTextColor', label: '🎨 لون نص الزر', ui: { component: 'color' } },
                            { type: 'number', name: 'ctaFontSize', label: '📏 حجم خط الزر (px)' },
                        ],
                    },
                    // ── Reviews Section Head ──
                    {
                        type: 'object',
                        name: 'reviews',
                        label: '⭐ قسم آراء العملاء (الرأس)',
                        fields: [
                            { type: 'string', name: 'label', label: '🏷️ العنوان الصغير' },
                            { type: 'string', name: 'title', label: '✍️ العنوان الرئيسي' },
                            { type: 'string', name: 'sectionBg', label: '🎨 خلفية القسم', ui: { component: 'color' } },
                            { type: 'string', name: 'labelColor', label: '🎨 لون العنوان الصغير', ui: { component: 'color' } },
                            { type: 'number', name: 'labelSize', label: '📏 حجم خط العنوان الصغير (px)' },
                            { type: 'string', name: 'titleColor', label: '🎨 لون العنوان الرئيسي', ui: { component: 'color' } },
                            { type: 'number', name: 'titleSize', label: '📏 حجم خط العنوان الرئيسي (px)' },
                        ],
                    },
                    // ── CTA ──
                    {
                        type: 'object',
                        name: 'cta',
                        label: '📣 قسم الدعوة للتواصل (آخر الصفحة)',
                        fields: [
                            { type: 'string', name: 'label', label: '🏷️ العنوان الصغير' },
                            { type: 'string', name: 'title', label: '✍️ العنوان الرئيسي' },
                            { type: 'string', name: 'subtitle', label: '📝 الجملة التوضيحية', ui: { component: 'textarea' } },
                            { type: 'string', name: 'primaryText', label: '🟡 نص الزر الرئيسي' },
                            { type: 'string', name: 'primaryLink', label: '🔗 رابط الزر الرئيسي' },
                            { type: 'string', name: 'secondaryText', label: '⬜ نص الزر الثانوي' },
                            { type: 'string', name: 'secondaryLink', label: '🔗 رابط الزر الثانوي' },
                            // Styling (FLAT)
                            { type: 'string', name: 'sectionBg', label: '🎨 خلفية القسم', ui: { component: 'color' } },
                            { type: 'string', name: 'labelColor', label: '🎨 لون العنوان الصغير', ui: { component: 'color' } },
                            { type: 'number', name: 'labelSize', label: '📏 حجم خط العنوان الصغير (px)' },
                            { type: 'string', name: 'titleColor', label: '🎨 لون العنوان الرئيسي', ui: { component: 'color' } },
                            { type: 'number', name: 'titleSize', label: '📏 حجم خط العنوان الرئيسي (px)' },
                            { type: 'string', name: 'subtitleColor', label: '🎨 لون الوصف', ui: { component: 'color' } },
                            { type: 'number', name: 'subtitleSize', label: '📏 حجم خط الوصف (px)' },
                            { type: 'string', name: 'primaryBtnBg', label: '🎨 خلفية الزر الرئيسي', ui: { component: 'color' } },
                            { type: 'string', name: 'primaryBtnText', label: '🎨 لون نص الزر الرئيسي', ui: { component: 'color' } },
                            { type: 'string', name: 'secondaryBtnBorder', label: '🎨 حدود الزر الثانوي', ui: { component: 'color' } },
                            { type: 'string', name: 'secondaryBtnText', label: '🎨 لون نص الزر الثانوي', ui: { component: 'color' } },
                            { type: 'number', name: 'primaryBtnSize', label: '📏 حجم خط الزر الرئيسي (px)' },
                            { type: 'number', name: 'secondaryBtnSize', label: '📏 حجم خط الزر الثانوي (px)' },
                        ],
                    },
                ],
            },
            // ─────────────────────────────────────────
            // 🗂️ PROJECTS (FLAT - No nested style)
            // ─────────────────────────────────────────
            {
                name: 'project',
                label: '🗂️ المشاريع',
                path: 'content/projects',
                format: 'json',
                ui: { itemProps: (item) => ({ label: `🗂️ ${item?.title || 'مشروع جديد'}` }) },
                fields: [
                    { type: 'string', name: 'title', label: '✍️ اسم المشروع', isTitle: true, required: true },
                    {
                        type: 'string',
                        name: 'category',
                        label: '📁 القسم',
                        options: [
                            { label: '🍳 مطابخ', value: 'مطابخ' },
                            { label: '👔 غرف ملابس', value: 'غرف ملابس' },
                            { label: '📺 وحدات تلفزيون', value: 'وحدات تلفزيون' },
                            { label: '⭐ تصميمات خاصة', value: 'تصميمات خاصة' },
                        ],
                    },
                    { type: 'string', name: 'description', label: '📝 الوصف', ui: { component: 'textarea' } },
                    { type: 'string', name: 'completionDate', label: '📅 التاريخ' },
                    { type: 'image', name: 'images', label: '📸 الصور', list: true },
                    // Styling fields at the ROOT
                    { type: 'string', name: 'titleColor', label: '🎨 لون العنوان', ui: { component: 'color' } },
                    { type: 'number', name: 'titleSize', label: '📏 حجم خط العنوان (px)' },
                    { type: 'string', name: 'descColor', label: '🎨 لون الوصف', ui: { component: 'color' } },
                    { type: 'number', name: 'descSize', label: '📏 حجم خط الوصف (px)' },
                    { type: 'string', name: 'cardBg', label: '🎨 خلفية البطاقة', ui: { component: 'color' } },
                    { type: 'string', name: 'titleFont', label: '🖋️ خط العنوان', ui: { placeholder: 'inherit' } },
                    { type: 'string', name: 'descFont', label: '🖋️ خط الوصف', ui: { placeholder: 'inherit' } },
                ],
            },
            // ─────────────────────────────────────────
            // ⭐ REVIEWS (FLAT - No nested style)
            // ─────────────────────────────────────────
            {
                name: 'review',
                label: '⭐ آراء العملاء',
                path: 'content/reviews',
                format: 'json',
                ui: {
                    itemProps: (item) => ({
                        label: item?.name ? `⭐ ${item.name} — ${'★'.repeat(Math.min(5, Number(item.rating) || 5))}` : '⭐ رأي جديد',
                    }),
                },
                fields: [
                    { type: 'string', name: 'name', label: '👤 اسم العميل', isTitle: true, required: true },
                    { type: 'string', name: 'quote', label: '💬 الرأي', ui: { component: 'textarea' } },
                    { type: 'string', name: 'location', label: '📍 الموقع' },
                    { type: 'number', name: 'rating', label: '⭐ التقييم (1-5)' },
                    // Styling fields at the ROOT
                    { type: 'string', name: 'quoteColor', label: '🎨 لون النص', ui: { component: 'color' } },
                    { type: 'number', name: 'quoteSize', label: '📏 حجم خط الرأي (px)' },
                    { type: 'string', name: 'nameColor', label: '🎨 لون الاسم', ui: { component: 'color' } },
                    { type: 'number', name: 'nameSize', label: '📏 حجم خط الاسم (px)' },
                    { type: 'string', name: 'locationColor', label: '🎨 لون الموقع', ui: { component: 'color' } },
                    { type: 'number', name: 'locationSize', label: '📏 حجم خط الموقع (px)' },
                    { type: 'string', name: 'starColor', label: '🎨 لون النجوم', ui: { component: 'color' } },
                    { type: 'string', name: 'cardBg', label: '🎨 خلفية البطاقة', ui: { component: 'color' } },
                ],
            },
            // ─────────────────────────────────────────
            // ⚙️ SETTINGS
            // ─────────────────────────────────────────
            {
                name: 'settings',
                label: '⚙️ إعدادات الموقع',
                path: 'content/settings',
                format: 'json',
                ui: {
                    global: true,
                    allowedActions: { create: false, delete: false },
                    filename: { readonly: true, slugify: () => 'index' },
                },
                fields: [
                    { type: 'string', name: 'brandName', label: '🏢 اسم البراند' },
                    { type: 'string', name: 'whatsapp', label: '📱 واتساب' },
                    { type: 'string', name: 'phone', label: '📞 هاتف' },
                    { type: 'string', name: 'email', label: '📧 إيميل' },
                    { type: 'string', name: 'location', label: '📍 العنوان' },
                    { type: 'string', name: 'goldColor', label: '🟡 اللون الذهبي الرئيسي', ui: { component: 'color' } },
                    { type: 'string', name: 'instagram', label: '📸 إنستجرام' },
                    { type: 'string', name: 'facebook', label: '👍 فيسبوك' },
                    { type: 'string', name: 'tiktok', label: '🎵 تيك توك' },
                    { type: 'string', name: 'twitter', label: '𝕏 تويتر' },
                    { type: 'string', name: 'pinterest', label: '📌 بينتريست' },
                    // Footer Styling (FLAT)
                    { type: 'string', name: 'footerBg', label: '🎨 خلفية الفوتر', ui: { component: 'color' } },
                    { type: 'string', name: 'footerTitleColor', label: '🎨 لون عناوين الفوتر', ui: { component: 'color' } },
                    { type: 'string', name: 'footerTextColor', label: '🎨 نصوص الفوتر', ui: { component: 'color' } },
                    { type: 'string', name: 'footerLinkColor', label: '🎨 روابط الفوتر', ui: { component: 'color' } },
                    { type: 'string', name: 'footerSocialColor', label: '🎨 أيقونات الفوتر', ui: { component: 'color' } },
                    { type: 'string', name: 'categories', label: '📁 أقسام المشاريع الأساسية', list: true },
                    // Portfolio (NESTED - Matches index.json)
                    {
                        type: 'object',
                        name: 'portfolio',
                        label: '🖼️ صفحة الأعمال (الرأس)',
                        fields: [
                            { type: 'string', name: 'label', label: '🏷️ العنوان الصغير' },
                            { type: 'string', name: 'labelColor', label: '🎨 لون العنوان الصغير', ui: { component: 'color' } },
                            { type: 'number', name: 'labelSize', label: '📏 حجم الخط (px)' },
                            { type: 'string', name: 'title', label: '✍️ العنوان الرئيسي' },
                            { type: 'string', name: 'titleColor', label: '🎨 لون العنوان', ui: { component: 'color' } },
                            { type: 'number', name: 'titleSize', label: '📏 حجم خط العنوان (px)' },
                            { type: 'string', name: 'subtitle', label: '📝 الجملة التوضيحية', ui: { component: 'textarea' } },
                            { type: 'string', name: 'subtitleColor', label: '🎨 لون الوصف', ui: { component: 'color' } },
                            { type: 'number', name: 'subtitleSize', label: '📏 حجم خط الوصف (px)' },
                            { type: 'string', name: 'sectionBg', label: '🎨 لون الخلفية', ui: { component: 'color' } },
                        ],
                    },
                    // Header (NESTED - Matches index.json)
                    {
                        type: 'object',
                        name: 'header',
                        label: '🔝 إعدادات الهيدر',
                        fields: [
                            { type: 'string', name: 'logoText', label: '🔤 اللوجو (En)' },
                            { type: 'string', name: 'logoColor', label: '🎨 لون اللوجو En', ui: { component: 'color' } },
                            { type: 'number', name: 'logoEnSize', label: '📏 حجم خط اللوجو (px)' },
                            { type: 'string', name: 'logoAr', label: '🔤 اللوجو (Ar)' },
                            { type: 'string', name: 'logoArColor', label: '🎨 لون اللوجو Ar', ui: { component: 'color' } },
                            { type: 'number', name: 'logoArSize', label: '📏 حجم خط اللوجو Ar (px)' },
                            {
                                type: 'object',
                                name: 'navLinks',
                                label: '🔗 روابط التنقل',
                                list: true,
                                ui: { itemProps: (item) => ({ label: item?.label || 'رابط جديد' }) },
                                fields: [
                                    { type: 'string', name: 'label', label: 'اسم الرابط' },
                                    { type: 'string', name: 'href', label: 'الصفحة' },
                                ],
                            },
                            { type: 'string', name: 'navLinkColor', label: '🎨 لون الروابط', ui: { component: 'color' } },
                            { type: 'number', name: 'navLinkSize', label: '📏 حجم الخط (px)' },
                            { type: 'string', name: 'headerBg', label: '🎨 لون الهيدر', ui: { component: 'color' } },
                            { type: 'string', name: 'ctaLabel', label: '🟡 نص زر الهيدر' },
                            { type: 'string', name: 'ctaBg', label: '🎨 خلفية الزر', ui: { component: 'color' } },
                            { type: 'string', name: 'ctaTextColor', label: '🎨 لون نص الزر', ui: { component: 'color' } },
                            { type: 'number', name: 'ctaFontSize', label: '📏 حجم خط الزر (px)' },
                        ],
                    },
                    { type: 'image', name: 'customFont', label: '🖋️ خط مخصص' },
                ],
            },
        ],
    },
});

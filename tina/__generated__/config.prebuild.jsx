// tina/config.js
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "00000000-0000-0000-0000-000000000000",
  token: process.env.TINA_TOKEN || "dummy_token",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ─────────────────────────────────────────
      // 🏠 HOMEPAGE
      // ─────────────────────────────────────────
      {
        name: "homepage",
        label: "\u{1F3E0} \u0627\u0644\u0635\u0641\u062D\u0629 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
        path: "content/homepage",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
          filename: { readonly: true, slugify: () => "index" }
        },
        fields: [
          // ── Hero ──
          {
            type: "object",
            name: "hero",
            label: "\u{1F3AF} \u0642\u0633\u0645 \u0627\u0644\u0647\u064A\u0631\u0648 (\u0623\u0648\u0644 \u0627\u0644\u0635\u0641\u062D\u0629)",
            fields: [
              { type: "string", name: "badge", label: "\u{1F3F7}\uFE0F \u0627\u0644\u0634\u0627\u0631\u0629 \u0627\u0644\u0639\u0644\u0648\u064A\u0629" },
              { type: "string", name: "headline", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "accent", label: "\u2728 \u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0645\u064A\u0632\u0629 (\u0627\u0644\u0630\u0647\u0628\u064A\u0629)" },
              { type: "string", name: "subtext", label: "\u{1F4DD} \u0627\u0644\u062C\u0645\u0644\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629", ui: { component: "textarea" } },
              { type: "image", name: "backgroundImage", label: "\u{1F5BC}\uFE0F \u0635\u0648\u0631\u0629 \u0627\u0644\u062E\u0644\u0641\u064A\u0629" },
              { type: "string", name: "primaryCtaText", label: "\u{1F7E1} \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "primaryCtaLink", label: "\u{1F517} \u0631\u0627\u0628\u0637 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "secondaryCtaText", label: "\u2B1C \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A" },
              { type: "string", name: "secondaryCtaLink", label: "\u{1F517} \u0631\u0627\u0628\u0637 \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A" },
              // Styling (FLAT)
              { type: "string", name: "badgeBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0634\u0627\u0631\u0629", ui: { component: "color" } },
              { type: "string", name: "badgeText", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0634\u0627\u0631\u0629", ui: { component: "color" } },
              { type: "number", name: "badgeSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0634\u0627\u0631\u0629 (px)" },
              { type: "string", name: "headlineColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646", ui: { component: "color" } },
              { type: "number", name: "headlineSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 (px)" },
              { type: "string", name: "accentColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0645\u064A\u0632\u0629", ui: { component: "color" } },
              { type: "string", name: "subtextColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u062C\u0645\u0644\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629", ui: { component: "color" } },
              { type: "number", name: "subtextSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u062C\u0645\u0644\u0629 (px)" },
              { type: "string", name: "primaryBtnBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "string", name: "primaryBtnText", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "string", name: "secondaryBtnBorder", label: "\u{1F3A8} \u062D\u062F\u0648\u062F \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A", ui: { component: "color" } },
              { type: "string", name: "secondaryBtnText", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A", ui: { component: "color" } },
              { type: "string", name: "overlayColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0634\u0641\u0627\u0641\u0629", ui: { component: "color" } },
              { type: "number", name: "overlayOpacity", label: "\u{1F313} \u0634\u0641\u0627\u0641\u064A\u0629 \u0627\u0644\u0637\u0628\u0642\u0629 (0-1)" }
            ]
          },
          // ── Categories ──
          {
            type: "object",
            name: "categories",
            label: "\u{1F5C2}\uFE0F \u0642\u0633\u0645 \u0627\u0644\u062E\u062F\u0645\u0627\u062A / \u0627\u0644\u0623\u0642\u0633\u0627\u0645",
            fields: [
              { type: "string", name: "label", label: "\u{1F3F7}\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631" },
              { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "subtitle", label: "\u{1F4DD} \u0627\u0644\u0648\u0635\u0641", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "\u{1F4E6} \u0628\u0637\u0627\u0642\u0627\u062A \u0627\u0644\u062E\u062F\u0645\u0627\u062A",
                list: true,
                ui: { itemProps: (item) => ({ label: `\u{1F4E6} ${item?.title || "\u062E\u062F\u0645\u0629 \u062C\u062F\u064A\u062F\u0629"}` }) },
                fields: [
                  { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0633\u0645 \u0627\u0644\u062E\u062F\u0645\u0629" },
                  { type: "string", name: "subtitle", label: "\u{1F4DD} \u0648\u0635\u0641 \u0641\u0631\u0639\u064A" },
                  { type: "string", name: "href", label: "\u{1F517} \u0627\u0644\u0631\u0627\u0628\u0637" },
                  { type: "image", name: "image", label: "\u{1F5BC}\uFE0F \u0627\u0644\u0635\u0648\u0631\u0629" }
                ]
              },
              // Styling (FLAT)
              { type: "string", name: "sectionBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0642\u0633\u0645", ui: { component: "color" } },
              { type: "string", name: "labelColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631", ui: { component: "color" } },
              { type: "number", name: "labelSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631 (px)" },
              { type: "string", name: "titleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "number", name: "titleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (px)" },
              { type: "string", name: "subtitleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0648\u0635\u0641", ui: { component: "color" } },
              { type: "number", name: "subtitleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0648\u0635\u0641 (px)" },
              { type: "string", name: "cardBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } },
              { type: "string", name: "cardTitleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } },
              { type: "string", name: "cardSubColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0648\u0635\u0641 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } }
            ]
          },
          // ── Trust ──
          {
            type: "object",
            name: "trust",
            label: "\u2705 \u0642\u0633\u0645 \u0627\u0644\u0645\u0645\u064A\u0632\u0627\u062A",
            fields: [
              { type: "string", name: "label", label: "\u{1F3F7}\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631" },
              { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              {
                type: "object",
                name: "items",
                label: "\u2B50 \u0627\u0644\u0645\u0645\u064A\u0632\u0627\u062A",
                list: true,
                ui: { itemProps: (item) => ({ label: `${item?.icon || "\u2B50"} ${item?.title || "\u0645\u064A\u0632\u0629 \u062C\u062F\u064A\u062F\u0629"}` }) },
                fields: [
                  { type: "string", name: "icon", label: "\u{1F3AD} \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629 (Emoji)" },
                  { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646" },
                  { type: "string", name: "desc", label: "\u{1F4DD} \u0627\u0644\u0648\u0635\u0641", ui: { component: "textarea" } }
                ]
              },
              // Styling (FLAT)
              { type: "string", name: "sectionBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0642\u0633\u0645", ui: { component: "color" } },
              { type: "string", name: "labelColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631", ui: { component: "color" } },
              { type: "number", name: "labelSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631 (px)" },
              { type: "string", name: "titleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "number", name: "titleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (px)" },
              { type: "string", name: "cardBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } },
              { type: "string", name: "cardTitleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } },
              { type: "string", name: "cardDescColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0648\u0635\u0641 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } },
              { type: "string", name: "iconColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629", ui: { component: "color" } },
              { type: "string", name: "iconBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0623\u064A\u0642\u0648\u0646\u0629", ui: { component: "color" } }
            ]
          },
          // ── Studio ──
          {
            type: "object",
            name: "studio",
            label: "\u{1F3A8} \u0642\u0633\u0645 \u0627\u0644\u0627\u0633\u062A\u0648\u062F\u064A\u0648",
            fields: [
              { type: "string", name: "label", label: "\u{1F3F7}\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631" },
              { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "text", label: "\u{1F4DD} \u0627\u0644\u0646\u0635", ui: { component: "textarea" } },
              { type: "string", name: "features", label: "\u2728 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0645\u064A\u0632\u0627\u062A", list: true },
              { type: "image", name: "images", label: "\u{1F5BC}\uFE0F \u0635\u0648\u0631 \u0627\u0644\u0645\u0639\u0631\u0636", list: true },
              { type: "string", name: "ctaText", label: "\u{1F7E1} \u0646\u0635 \u0627\u0644\u0632\u0631" },
              { type: "string", name: "ctaLink", label: "\u{1F517} \u0627\u0644\u0631\u0627\u0628\u0637" },
              // Styling (FLAT)
              { type: "string", name: "sectionBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0642\u0633\u0645", ui: { component: "color" } },
              { type: "string", name: "labelColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631", ui: { component: "color" } },
              { type: "number", name: "labelSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631 (px)" },
              { type: "string", name: "titleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646", ui: { component: "color" } },
              { type: "number", name: "titleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 (px)" },
              { type: "string", name: "textColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0646\u0635 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "number", name: "textSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0646\u0635 (px)" },
              { type: "string", name: "featureIconColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0623\u064A\u0642\u0648\u0646\u0629 \u0627\u0644\u0645\u064A\u0632\u0629", ui: { component: "color" } },
              { type: "string", name: "featureTextColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0645\u064A\u0632\u0627\u062A", ui: { component: "color" } },
              { type: "string", name: "ctaBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0632\u0631", ui: { component: "color" } },
              { type: "string", name: "ctaTextColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0632\u0631", ui: { component: "color" } },
              { type: "number", name: "ctaFontSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0632\u0631 (px)" }
            ]
          },
          // ── Reviews Section Head ──
          {
            type: "object",
            name: "reviews",
            label: "\u2B50 \u0642\u0633\u0645 \u0622\u0631\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621 (\u0627\u0644\u0631\u0623\u0633)",
            fields: [
              { type: "string", name: "label", label: "\u{1F3F7}\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631" },
              { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "sectionBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0642\u0633\u0645", ui: { component: "color" } },
              { type: "string", name: "labelColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631", ui: { component: "color" } },
              { type: "number", name: "labelSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631 (px)" },
              { type: "string", name: "titleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "number", name: "titleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (px)" }
            ]
          },
          // ── CTA ──
          {
            type: "object",
            name: "cta",
            label: "\u{1F4E3} \u0642\u0633\u0645 \u0627\u0644\u062F\u0639\u0648\u0629 \u0644\u0644\u062A\u0648\u0627\u0635\u0644 (\u0622\u062E\u0631 \u0627\u0644\u0635\u0641\u062D\u0629)",
            fields: [
              { type: "string", name: "label", label: "\u{1F3F7}\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631" },
              { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "subtitle", label: "\u{1F4DD} \u0627\u0644\u062C\u0645\u0644\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629", ui: { component: "textarea" } },
              { type: "string", name: "primaryText", label: "\u{1F7E1} \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "primaryLink", label: "\u{1F517} \u0631\u0627\u0628\u0637 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "secondaryText", label: "\u2B1C \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A" },
              { type: "string", name: "secondaryLink", label: "\u{1F517} \u0631\u0627\u0628\u0637 \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A" },
              // Styling (FLAT)
              { type: "string", name: "sectionBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0642\u0633\u0645", ui: { component: "color" } },
              { type: "string", name: "labelColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631", ui: { component: "color" } },
              { type: "number", name: "labelSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631 (px)" },
              { type: "string", name: "titleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "number", name: "titleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (px)" },
              { type: "string", name: "subtitleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0648\u0635\u0641", ui: { component: "color" } },
              { type: "number", name: "subtitleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0648\u0635\u0641 (px)" },
              { type: "string", name: "primaryBtnBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "string", name: "primaryBtnText", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
              { type: "string", name: "secondaryBtnBorder", label: "\u{1F3A8} \u062D\u062F\u0648\u062F \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A", ui: { component: "color" } },
              { type: "string", name: "secondaryBtnText", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A", ui: { component: "color" } },
              { type: "number", name: "primaryBtnSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0632\u0631 \u0627\u0644\u0631\u0626\u064A\u0633\u064A (px)" },
              { type: "number", name: "secondaryBtnSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0632\u0631 \u0627\u0644\u062B\u0627\u0646\u0648\u064A (px)" }
            ]
          }
        ]
      },
      // ─────────────────────────────────────────
      // 🗂️ PROJECTS (FLAT - No nested style)
      // ─────────────────────────────────────────
      {
        name: "project",
        label: "\u{1F5C2}\uFE0F \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639",
        path: "content/projects",
        format: "json",
        ui: { itemProps: (item) => ({ label: `\u{1F5C2}\uFE0F ${item?.title || "\u0645\u0634\u0631\u0648\u0639 \u062C\u062F\u064A\u062F"}` }) },
        fields: [
          { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0633\u0645 \u0627\u0644\u0645\u0634\u0631\u0648\u0639", isTitle: true, required: true },
          {
            type: "string",
            name: "category",
            label: "\u{1F4C1} \u0627\u0644\u0642\u0633\u0645",
            options: [
              { label: "\u{1F373} \u0645\u0637\u0627\u0628\u062E", value: "\u0645\u0637\u0627\u0628\u062E" },
              { label: "\u{1F454} \u063A\u0631\u0641 \u0645\u0644\u0627\u0628\u0633", value: "\u063A\u0631\u0641 \u0645\u0644\u0627\u0628\u0633" },
              { label: "\u{1F4FA} \u0648\u062D\u062F\u0627\u062A \u062A\u0644\u0641\u0632\u064A\u0648\u0646", value: "\u0648\u062D\u062F\u0627\u062A \u062A\u0644\u0641\u0632\u064A\u0648\u0646" },
              { label: "\u2B50 \u062A\u0635\u0645\u064A\u0645\u0627\u062A \u062E\u0627\u0635\u0629", value: "\u062A\u0635\u0645\u064A\u0645\u0627\u062A \u062E\u0627\u0635\u0629" }
            ]
          },
          { type: "string", name: "description", label: "\u{1F4DD} \u0627\u0644\u0648\u0635\u0641", ui: { component: "textarea" } },
          { type: "string", name: "completionDate", label: "\u{1F4C5} \u0627\u0644\u062A\u0627\u0631\u064A\u062E" },
          { type: "image", name: "images", label: "\u{1F4F8} \u0627\u0644\u0635\u0648\u0631", list: true },
          // Styling fields at the ROOT
          { type: "string", name: "titleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646", ui: { component: "color" } },
          { type: "number", name: "titleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 (px)" },
          { type: "string", name: "descColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0648\u0635\u0641", ui: { component: "color" } },
          { type: "number", name: "descSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0648\u0635\u0641 (px)" },
          { type: "string", name: "cardBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } },
          { type: "string", name: "titleFont", label: "\u{1F58B}\uFE0F \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646", ui: { placeholder: "inherit" } },
          { type: "string", name: "descFont", label: "\u{1F58B}\uFE0F \u062E\u0637 \u0627\u0644\u0648\u0635\u0641", ui: { placeholder: "inherit" } }
        ]
      },
      // ─────────────────────────────────────────
      // ⭐ REVIEWS (FLAT - No nested style)
      // ─────────────────────────────────────────
      {
        name: "review",
        label: "\u2B50 \u0622\u0631\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
        path: "content/reviews",
        format: "json",
        ui: {
          itemProps: (item) => ({
            label: item?.name ? `\u2B50 ${item.name} \u2014 ${"\u2605".repeat(Math.min(5, Number(item.rating) || 5))}` : "\u2B50 \u0631\u0623\u064A \u062C\u062F\u064A\u062F"
          })
        },
        fields: [
          { type: "string", name: "name", label: "\u{1F464} \u0627\u0633\u0645 \u0627\u0644\u0639\u0645\u064A\u0644", isTitle: true, required: true },
          { type: "string", name: "quote", label: "\u{1F4AC} \u0627\u0644\u0631\u0623\u064A", ui: { component: "textarea" } },
          { type: "string", name: "location", label: "\u{1F4CD} \u0627\u0644\u0645\u0648\u0642\u0639" },
          { type: "number", name: "rating", label: "\u2B50 \u0627\u0644\u062A\u0642\u064A\u064A\u0645 (1-5)" },
          // Styling fields at the ROOT
          { type: "string", name: "quoteColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0646\u0635", ui: { component: "color" } },
          { type: "number", name: "quoteSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0631\u0623\u064A (px)" },
          { type: "string", name: "nameColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0627\u0633\u0645", ui: { component: "color" } },
          { type: "number", name: "nameSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0627\u0633\u0645 (px)" },
          { type: "string", name: "locationColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0645\u0648\u0642\u0639", ui: { component: "color" } },
          { type: "number", name: "locationSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0645\u0648\u0642\u0639 (px)" },
          { type: "string", name: "starColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0646\u062C\u0648\u0645", ui: { component: "color" } },
          { type: "string", name: "cardBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0628\u0637\u0627\u0642\u0629", ui: { component: "color" } }
        ]
      },
      // ─────────────────────────────────────────
      // ⚙️ SETTINGS
      // ─────────────────────────────────────────
      {
        name: "settings",
        label: "\u2699\uFE0F \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0645\u0648\u0642\u0639",
        path: "content/settings",
        format: "json",
        ui: {
          global: true,
          allowedActions: { create: false, delete: false },
          filename: { readonly: true, slugify: () => "index" }
        },
        fields: [
          { type: "string", name: "brandName", label: "\u{1F3E2} \u0627\u0633\u0645 \u0627\u0644\u0628\u0631\u0627\u0646\u062F" },
          { type: "string", name: "whatsapp", label: "\u{1F4F1} \u0648\u0627\u062A\u0633\u0627\u0628" },
          { type: "string", name: "phone", label: "\u{1F4DE} \u0647\u0627\u062A\u0641" },
          { type: "string", name: "email", label: "\u{1F4E7} \u0625\u064A\u0645\u064A\u0644" },
          { type: "string", name: "location", label: "\u{1F4CD} \u0627\u0644\u0639\u0646\u0648\u0627\u0646" },
          { type: "string", name: "goldColor", label: "\u{1F7E1} \u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0630\u0647\u0628\u064A \u0627\u0644\u0631\u0626\u064A\u0633\u064A", ui: { component: "color" } },
          { type: "string", name: "instagram", label: "\u{1F4F8} \u0625\u0646\u0633\u062A\u062C\u0631\u0627\u0645" },
          { type: "string", name: "facebook", label: "\u{1F44D} \u0641\u064A\u0633\u0628\u0648\u0643" },
          { type: "string", name: "tiktok", label: "\u{1F3B5} \u062A\u064A\u0643 \u062A\u0648\u0643" },
          { type: "string", name: "twitter", label: "\u{1D54F} \u062A\u0648\u064A\u062A\u0631" },
          { type: "string", name: "pinterest", label: "\u{1F4CC} \u0628\u064A\u0646\u062A\u0631\u064A\u0633\u062A" },
          // Footer Styling (FLAT)
          { type: "string", name: "footerBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0641\u0648\u062A\u0631", ui: { component: "color" } },
          { type: "string", name: "footerTitleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0639\u0646\u0627\u0648\u064A\u0646 \u0627\u0644\u0641\u0648\u062A\u0631", ui: { component: "color" } },
          { type: "string", name: "footerTextColor", label: "\u{1F3A8} \u0646\u0635\u0648\u0635 \u0627\u0644\u0641\u0648\u062A\u0631", ui: { component: "color" } },
          { type: "string", name: "footerLinkColor", label: "\u{1F3A8} \u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u0641\u0648\u062A\u0631", ui: { component: "color" } },
          { type: "string", name: "footerSocialColor", label: "\u{1F3A8} \u0623\u064A\u0642\u0648\u0646\u0627\u062A \u0627\u0644\u0641\u0648\u062A\u0631", ui: { component: "color" } },
          { type: "string", name: "categories", label: "\u{1F4C1} \u0623\u0642\u0633\u0627\u0645 \u0627\u0644\u0645\u0634\u0627\u0631\u064A\u0639 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629", list: true },
          // Portfolio (NESTED - Matches index.json)
          {
            type: "object",
            name: "portfolio",
            label: "\u{1F5BC}\uFE0F \u0635\u0641\u062D\u0629 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 (\u0627\u0644\u0631\u0623\u0633)",
            fields: [
              { type: "string", name: "label", label: "\u{1F3F7}\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631" },
              { type: "string", name: "labelColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0635\u063A\u064A\u0631", ui: { component: "color" } },
              { type: "number", name: "labelSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u0627\u0644\u062E\u0637 (px)" },
              { type: "string", name: "title", label: "\u270D\uFE0F \u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A" },
              { type: "string", name: "titleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0639\u0646\u0648\u0627\u0646", ui: { component: "color" } },
              { type: "number", name: "titleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0639\u0646\u0648\u0627\u0646 (px)" },
              { type: "string", name: "subtitle", label: "\u{1F4DD} \u0627\u0644\u062C\u0645\u0644\u0629 \u0627\u0644\u062A\u0648\u0636\u064A\u062D\u064A\u0629", ui: { component: "textarea" } },
              { type: "string", name: "subtitleColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0648\u0635\u0641", ui: { component: "color" } },
              { type: "number", name: "subtitleSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0648\u0635\u0641 (px)" },
              { type: "string", name: "sectionBg", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u062E\u0644\u0641\u064A\u0629", ui: { component: "color" } }
            ]
          },
          // Header (NESTED - Matches index.json)
          {
            type: "object",
            name: "header",
            label: "\u{1F51D} \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0647\u064A\u062F\u0631",
            fields: [
              { type: "string", name: "logoText", label: "\u{1F524} \u0627\u0644\u0644\u0648\u062C\u0648 (En)" },
              { type: "string", name: "logoColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0644\u0648\u062C\u0648 En", ui: { component: "color" } },
              { type: "number", name: "logoEnSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0644\u0648\u062C\u0648 (px)" },
              { type: "string", name: "logoAr", label: "\u{1F524} \u0627\u0644\u0644\u0648\u062C\u0648 (Ar)" },
              { type: "string", name: "logoArColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0644\u0648\u062C\u0648 Ar", ui: { component: "color" } },
              { type: "number", name: "logoArSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0644\u0648\u062C\u0648 Ar (px)" },
              {
                type: "object",
                name: "navLinks",
                label: "\u{1F517} \u0631\u0648\u0627\u0628\u0637 \u0627\u0644\u062A\u0646\u0642\u0644",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label || "\u0631\u0627\u0628\u0637 \u062C\u062F\u064A\u062F" }) },
                fields: [
                  { type: "string", name: "label", label: "\u0627\u0633\u0645 \u0627\u0644\u0631\u0627\u0628\u0637" },
                  { type: "string", name: "href", label: "\u0627\u0644\u0635\u0641\u062D\u0629" }
                ]
              },
              { type: "string", name: "navLinkColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0631\u0648\u0627\u0628\u0637", ui: { component: "color" } },
              { type: "number", name: "navLinkSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u0627\u0644\u062E\u0637 (px)" },
              { type: "string", name: "headerBg", label: "\u{1F3A8} \u0644\u0648\u0646 \u0627\u0644\u0647\u064A\u062F\u0631", ui: { component: "color" } },
              { type: "string", name: "ctaLabel", label: "\u{1F7E1} \u0646\u0635 \u0632\u0631 \u0627\u0644\u0647\u064A\u062F\u0631" },
              { type: "string", name: "ctaBg", label: "\u{1F3A8} \u062E\u0644\u0641\u064A\u0629 \u0627\u0644\u0632\u0631", ui: { component: "color" } },
              { type: "string", name: "ctaTextColor", label: "\u{1F3A8} \u0644\u0648\u0646 \u0646\u0635 \u0627\u0644\u0632\u0631", ui: { component: "color" } },
              { type: "number", name: "ctaFontSize", label: "\u{1F4CF} \u062D\u062C\u0645 \u062E\u0637 \u0627\u0644\u0632\u0631 (px)" }
            ]
          },
          { type: "image", name: "customFont", label: "\u{1F58B}\uFE0F \u062E\u0637 \u0645\u062E\u0635\u0635" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};

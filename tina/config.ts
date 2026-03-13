import { defineConfig } from "tinacms";

const markdownFields = [
  { type: "string", name: "title", label: "Title", required: true },
  { type: "datetime", name: "date", label: "Publish Date", required: true },
  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
  { type: "string", name: "category", label: "Category" },
  { type: "string", name: "tags", label: "Tags", list: true },
  { type: "rich-text", name: "body", label: "Body", isBody: true },
] as const;

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Dummy tokens to satisfy TypeScript; CLI validation bypassed via NEXT_PUBLIC_TINA_CLIENT_ID='' in package.json
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "00000000-0000-0000-0000-000000000000",
  token: process.env.TINA_TOKEN || "000000000000000000000000000000000000000",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Home Page",
        path: "content/page",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/",
        },
        fields: [
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "image", name: "profilePicture", label: "Profile Picture" },
              { type: "string", name: "badge", label: "Badge Text" },
              { type: "string", name: "headlinePrefix", label: "Headline Prefix" },
              { type: "string", name: "headlineSuffix", label: "Headline Suffix" },
              { type: "string", name: "subheadlineLine1", label: "Subheadline Line 1" },
              { type: "string", name: "subheadlineLine2", label: "Subheadline Line 2" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object", name: "primaryCta", label: "Primary CTA",
                fields: [{ type: "string", name: "text", label: "Text" }, { type: "string", name: "link", label: "Link" }]
              },
              {
                type: "object", name: "secondaryCta", label: "Secondary CTA",
                fields: [{ type: "string", name: "text", label: "Text" }, { type: "string", name: "link", label: "Link" }]
              }
            ]
          },
          {
            type: "object",
            name: "about",
            label: "About Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "paragraphs", label: "Paragraphs", list: true, ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "skills",
            label: "Skills Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              {
                type: "object", name: "categories", label: "Categories", list: true,
                fields: [
                  { type: "string", name: "id", label: "ID" },
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "items", label: "Items" },
                  { type: "string", name: "color", label: "Color", options: ["primary", "accent"] }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "certificates",
            label: "Certificates Section",
            fields: [
              { type: "string", name: "title", label: "Section Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object", name: "list", label: "Certificate List", list: true,
                fields: [
                  { type: "string", name: "title", label: "Certificate Title" },
                  { type: "string", name: "issuer", label: "Issuer (e.g., Coursera, Cisco)" },
                  { type: "string", name: "date", label: "Date Earned" },
                  { type: "string", name: "link", label: "Certificate Link" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "projects",
            label: "Projects Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              {
                type: "object", name: "list", label: "Project List", list: true,
                fields: [
                  { type: "string", name: "title", label: "Project Title" },
                  { type: "string", name: "description", label: "Project Description", ui: { component: "textarea" } },
                  { type: "string", name: "tech", label: "Technologies", list: true },
                  { type: "string", name: "github", label: "GitHub Link" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "blog",
            label: "Blog/Research Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "linkText", label: "Link Text" },
              { type: "string", name: "linkUrl", label: "Link URL" }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
              { type: "string", name: "email", label: "Email Address" },
              {
                type: "object", name: "socials", label: "Social Links", list: true,
                fields: [
                  { type: "string", name: "name", label: "Platform Name" },
                  { type: "string", name: "link", label: "URL" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Footer Settings",
            fields: [
              { type: "string", name: "name", label: "Brand Name" },
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "string", name: "subTagline", label: "Sub-Tagline" }
            ]
          }
        ],
      },
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
        },
        fields: [...markdownFields],
      },
      {
        name: "writeups",
        label: "Writeups",
        path: "content/writeups",
        format: "md",
        ui: {
          router: ({ document }) => `/writeups/${document._sys.filename}`,
        },
        fields: [...markdownFields],
      },
    ],
  },
});

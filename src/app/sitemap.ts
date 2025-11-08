import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const lastModified = new Date();

  return [
    { url: `${base}/`,          lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/about`,     lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/services`,  lastModified, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/events`,    lastModified, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/trainings`, lastModified, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${base}/contact`,   lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}

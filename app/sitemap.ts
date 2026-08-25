import type { MetadataRoute } from "next";
import { profile, projects } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.site, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${profile.site}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

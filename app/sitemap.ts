// file: app/sitemap.ts
import { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BUSINESS_NAP } from "@/lib/constants";

const BASE_URL = BUSINESS_NAP.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Fetch Dynamic Data
  const pillars = await fetchQuery(api.content.getAllPillars, {});
  const clusters = await fetchQuery(api.content.getAllClusters, {});

  // 2. Define Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`, // Assuming you create this
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`, // Assuming you create this
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // 3. Generate Pillar Routes (Priority 0.9)
  const pillarRoutes: MetadataRoute.Sitemap = pillars.map((pillar) => ({
    url: `${BASE_URL}/services/${pillar.slug}`,
    lastModified: new Date(), // Replace with actual pillar.updatedAt if available
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 4. Generate Cluster Routes (Priority 0.7)
  const clusterRoutes: MetadataRoute.Sitemap = clusters.map((item) => ({
    url: `${BASE_URL}/services/${item.pillarSlug}/${item.clusterSlug}`,
    lastModified: item.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Combine All
  return [...staticRoutes, ...pillarRoutes, ...clusterRoutes];
}
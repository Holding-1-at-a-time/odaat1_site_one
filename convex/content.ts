// file: convex/content.ts
import { v } from "convex/values";
import { query } from "./_generated/server";

// Fetch a single Pillar Page by its slug
export const getPillarBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const pillar = await ctx.db
      .query("pillarPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    return pillar;
  },
});

// Fetch all Cluster Pages associated with a specific Pillar Page ID
export const getClustersByPillarId = query({
  args: { pillarId: v.id("pillarPages") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clusterPages")
      .withIndex("by_pillar", (q) => q.eq("pillarPageId", args.pillarId))
      .collect();
  },
});

// Fetch a specific Cluster Page by slug and verify its parent Pillar
// Note: We fetch by slug directly for efficiency, but in a real app check the parent relation if needed.
export const getClusterBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const cluster = await ctx.db
      .query("clusterPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    
    if (!cluster) return null;

    const pillar = await ctx.db.get(cluster.pillarPageId);
    return { cluster, pillar };
  },
});
// NEW: Fetch all Pillar Pages for the services index
export const getAllPillars = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all pillar pages
    // In a real app with many records, you might paginate this.
    // For 14 services, collecting all is perfectly fine and fast.
    return await ctx.db.query("pillarPages").collect();
  },
});



// NEW: Helper for Sitemap generation
export const getAllClusters = query({
  args: {},
  handler: async (ctx) => {
    // In a massive app, you'd paginate or use an index.
    // For ~100 pages, a full scan is acceptable for sitemap generation.
    const clusters = await ctx.db.query("clusterPages").collect();
    
    // We need the parent slug to construct the URL: /services/parent/child
    // This requires a join-like operation.
    const results = [];
    for (const cluster of clusters) {
      const pillar = await ctx.db.get(cluster.pillarPageId);
      if (pillar) {
        results.push({
          clusterSlug: cluster.slug,
          pillarSlug: pillar.slug,
          updatedAt: new Date(), // In real app, use a proper updatedAt field
        });
      }
    }
    return results;
  },
});
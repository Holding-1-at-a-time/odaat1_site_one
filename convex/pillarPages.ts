import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

/**
 * Pillar Pages Query Functions
 * These functions handle fetching pillar page data with optimized queries.
 * All queries use proper indexes to ensure O(log n) performance.
 */

// Simple lookup for basic page rendering
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args): Promise<Doc<"pillarPages"> | null> => {
    return await ctx.db
      .query("pillarPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

// Composite Query: Fetches the Pillar Page AND all its related Cluster Pages.
export const getWithClusters = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const pillar = await ctx.db
      .query("pillarPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();

    if (!pillar) return null;

    const clusters = await ctx.db
      .query("clusterPages")
      .withIndex("by_pillar", (q) => q.eq("pillarPageId", pillar._id))
      .collect();

    return { pillar, clusters };
  },
});

// Get all pillar pages for navigation
export const getAll = query({
  handler: async (ctx): Promise<Doc<"pillarPages">[]> => {
    return await ctx.db
      .query("pillarPages")
      .order("desc")
      .collect();
  },
});

// Get recently updated pillar pages
export const getRecentlyUpdated = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args): Promise<Doc<"pillarPages">[]> => {
    const limit = args.limit ?? 50;
    
    return await ctx.db
      .query("pillarPages")
      .order("desc")
      .take(limit);
  },
});

// List featured pillar pages for homepage
export const listFeatured = query({
  args: {},
  handler: async (ctx): Promise<Doc<"pillarPages">[]> => {
    return await ctx.db
      .query("pillarPages")
      .order("desc")
      .take(8);
  },
});

// Create a new pillar page
export const createPillarPage = mutation({
  args: {
    slug: v.string(),
    serviceName: v.string(),
    title: v.string(),
    metaDescription: v.string(),
    content: v.string(),
    keywords: v.array(v.string()),
    updatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const pillarId = await ctx.db.insert("pillarPages", args);
    return pillarId;
  },
});
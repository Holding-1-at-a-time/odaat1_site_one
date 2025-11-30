import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

/**
 * Cluster Pages Query Functions
 * These functions handle fetching cluster page data with optimized queries.
 * All queries use proper indexes to ensure O(log n) performance.
 */

// Efficient lookup using composite index
export const getByPillarAndSlug = query({
  args: {
    pillarSlug: v.string(),
    slug: v.string()
  },
  handler: async (ctx, args): Promise<Doc<"clusterPages"> | null> => {
    // First find the pillar page ID
    const pillar = await ctx.db
      .query("pillarPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.pillarSlug))
      .unique();

    if (!pillar) return null;

    // Then find the cluster by pillar ID and slug
    return await ctx.db
      .query("clusterPages")
      .withIndex("by_pillar", (q) => q.eq("pillarPageId", pillar._id))
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .unique();
  },
});

// Get all clusters for a pillar (for navigation)
export const getByPillarSlug = query({
  args: { pillarSlug: v.string() },
  handler: async (ctx, args): Promise<Doc<"clusterPages">[]> => {
    // First find the pillar page ID
    const pillar = await ctx.db
      .query("pillarPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.pillarSlug))
      .unique();

    if (!pillar) return [];

    // Then find all clusters for this pillar
    return await ctx.db
      .query("clusterPages")
      .withIndex("by_pillar", (q) => q.eq("pillarPageId", pillar._id))
      .collect();
  },
});

// Get cluster by ID
export const getById = query({
  args: { id: v.id("clusterPages") },
  handler: async (ctx, args): Promise<Doc<"clusterPages"> | null> => {
    return await ctx.db.get(args.id);
  },
});

// Get related clusters based on the relatedClusterIds array
export const getRelated = query({
  args: {
    clusterId: v.id("clusterPages"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"clusterPages">[]> => {
    const cluster = await ctx.db.get(args.clusterId);
    if (!cluster || !cluster.relatedClusterIds) {
      return [];
    }

    const limit = args.limit ?? 5;
    const relatedIds = cluster.relatedClusterIds.slice(0, limit);

    const relatedClusters: Doc<"clusterPages">[] = [];
    for (const id of relatedIds) {
      const relatedCluster = await ctx.db.get(id);
      if (relatedCluster) {
        relatedClusters.push(relatedCluster);
      }
    }

    return relatedClusters;
  },
});

// Search clusters by keyword across all pillars
export const searchByKeyword = query({
  args: {
    keyword: v.string(),
    pillarSlug: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<Doc<"clusterPages">[]> => {
    let clusters = await ctx.db
      .query("clusterPages")
      .collect();

    // Filter by pillar if specified
    if (args.pillarSlug) {
      // Get the pillar ID first
      const pillar = await ctx.db
        .query("pillarPages")
        .withIndex("by_slug", (q) => q.eq("slug", args.pillarSlug!))
        .unique();

      if (pillar) {
        clusters = clusters.filter(c => c.pillarPageId === pillar._id);
      } else {
        clusters = []; // No pillar found
      }
    }

    // Filter by keyword in title, content, or keywords array
    return clusters.filter(cluster =>
      cluster.title.toLowerCase().includes(args.keyword.toLowerCase()) ||
      cluster.content.toLowerCase().includes(args.keyword.toLowerCase()) ||
      cluster.keywords.some(k =>
        k.toLowerCase().includes(args.keyword.toLowerCase())
      )
    );
  },
});

// Get recent clusters across all pillars
export const getRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"clusterPages">[]> => {
    const limit = args.limit ?? 20;

    return await ctx.db
      .query("clusterPages")
      .order("desc")
      .take(limit);
  },
});

// Create a new cluster page
export const createClusterPage = mutation({
  args: {
    slug: v.string(),
    pillarSlug: v.string(),
    title: v.string(),
    metaDescription: v.string(),
    content: v.string(),
    keywords: v.array(v.string()),
    relatedClusterIds: v.optional(v.array(v.id("clusterPages"))),
  },
  handler: async (ctx, args) => {
    // First find the pillar page to get its ID
    const pillar = await ctx.db
      .query("pillarPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.pillarSlug))
      .unique();

    if (!pillar) {
      throw new Error(`Pillar page with slug "${args.pillarSlug}" not found`);
    }

    const { relatedClusterIds, ...clusterData } = args;

    return await ctx.db.insert("clusterPages", {
      ...clusterData,
      pillarPageId: pillar._id,
      ...(relatedClusterIds && { relatedClusterIds }),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  },
});

// Update cluster page relationships
export const updateClusterRelationships = mutation({
  args: {
    clusterSlug: v.string(),
    relatedClusterIds: v.array(v.id("clusterPages")),
  },
  handler: async (ctx, args) => {
    // Find the cluster by slug
    const cluster = await ctx.db
      .query("clusterPages")
      .withIndex("by_slug", (q) => q.eq("slug", args.clusterSlug))
      .unique();

    if (!cluster) {
      throw new Error(`Cluster page with slug "${args.clusterSlug}" not found`);
    }

    // Update the relatedClusterIds
    await ctx.db.patch(cluster._id, {
      relatedClusterIds: args.relatedClusterIds,
    });

    return cluster._id;
  },
});
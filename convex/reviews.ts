import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

/**
 * Reviews Management Functions
 * These functions handle customer reviews for social proof and local SEO.
 * All queries use proper indexes to ensure O(log n) performance.
 */

// Admin configuration - maintain this list as the single source of truth for admin access
// Load admin emails from environment variable (comma-separated)
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "").split(",").filter(Boolean);

/**
 * Robust admin check function that validates admin status through multiple secure methods:
 * 1. Explicit role claim check (primary method)
 * 2. Email whitelist validation (fallback method)
 * 
 * @param identity - The user identity object returned from ctx.auth.getUserIdentity()
 * @returns boolean - true if user is admin, false otherwise
 */
const isAdmin = (identity: any): boolean => {
  if (!identity) {
    return false;
  }

  // Method 1: Check for explicit role claim (most secure)
  if (identity.role === "admin") {
    return true;
  }

  // Check nested role claims
  if (identity.user?.role === "admin" || identity.user?.role === "administrator") {
    return true;
  }

  // Method 2: Validate against email whitelist (secure fallback)
  const userEmail = identity.email || 
                   identity.primary || 
                   identity.user?.email || 
                   identity.token?.email;

  if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
    return true;
  }

  return false;
};

// Get reviews for a specific service
export const getByService = query({
  args: {
    serviceSlug: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"reviews">[]> => {
    const limit = args.limit ?? 50;

    if (args.serviceSlug) {
      return await ctx.db
        .query("reviews")
        .withIndex("by_serviceSlug", (q) => q.eq("serviceSlug", args.serviceSlug ?? ""))
        .order("desc")
        .take(limit);
    } else {
      return await ctx.db
        .query("reviews")
        .order("desc")
        .take(limit);
    }
  },
});

// Get verified reviews for a service (higher trust)
export const getVerifiedByService = query({
  args: {
    serviceSlug: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"reviews">[]> => {
    const limit = args.limit ?? 20;

    const allReviews = await ctx.db

      .query("reviews")
      .withIndex("by_serviceSlug", (q) => q.eq("serviceSlug", args.serviceSlug))
      .collect();

    return allReviews
      .filter(review => review.isVerified)
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  },
});

// Get recent reviews across all services
export const getRecent = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"reviews">[]> => {
    const limit = args.limit ?? 20;

    return await ctx.db
      .query("reviews")
      .order("desc")
      .take(limit);
  },
});

// Alias for getRecent (for easier API consumption)
export const listRecent = getRecent;

// Add a new review
export const createReview = mutation({
  args: {
    serviceSlug: v.optional(v.string()),
    customerName: v.string(),
    rating: v.number(), // 1-5 integer
    comment: v.string(),
    isVerified: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Validate rating
    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    // Validate required fields
    if (!args.customerName || !args.comment) {
      throw new Error("Customer name and comment are required");
    }

    return await ctx.db.insert("reviews", {
      ...args,
      serviceSlug: args.serviceSlug ?? "",
      createdAt: Date.now(),
    });
  },
});

// Get average rating for a service
export const getAverageRating = query({
  args: { serviceSlug: v.string() },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_serviceSlug", (q) => q.eq("serviceSlug", args.serviceSlug))
      .collect();

    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0 };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return {
      averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
      totalReviews: reviews.length,
    };
  },
});

// Get rating distribution for a service
export const getRatingDistribution = query({
  args: { serviceSlug: v.string() },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_serviceSlug", (q) => q.eq("serviceSlug", args.serviceSlug))
      .collect();

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });

    return distribution;
  },
});
// Delete review (for admin use)
export const deleteReview = mutation({
  args: { reviewId: v.id("reviews") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity || !isAdmin(identity)) {
      throw new Error("Unauthorized: Admin access required");
    }
    await ctx.db.delete(args.reviewId);
  },
});
// Update review verification status
export const updateVerification = mutation({
  args: {
    reviewId: v.id("reviews"),
    isVerified: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Properly authenticate user using Convex auth API
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized: Authentication required");
    }

    // Use centralized admin validation
    if (!isAdmin(identity)) {
      throw new Error("Unauthorized: Admin access required");
    }

    // Only proceed with patch if admin check passes
    await ctx.db.patch(args.reviewId, { isVerified: args.isVerified });
  },
});
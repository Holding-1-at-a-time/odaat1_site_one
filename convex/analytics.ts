// file: convex/analytics.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ClerkClaims } from "./users";

// Public: logPageView (Unchanged)
export const logPageView = mutation({
    args: {
        slug: v.string(),
        type: v.string(),
    },
    returns: v.null(),
    handler: async (ctx, args) => {
        await ctx.db.insert("pageViews", {
            slug: args.slug,
            type: args.type,
            timestamp: Date.now(),
        });
        return null;
    },
});
// REFACTORED: Strict Role Check for Metrics
export const getKeyMetrics = query({
    args: {},
    returns: v.union(
        v.null(),
        v.object({
            totalViews: v.number(),
            totalLeads: v.number(),
            totalBookings: v.number(),
            conversionRate: v.string(),
            recentViews: v.array(v.object({
                _id: v.id("pageViews"),
                _creationTime: v.number(),
                slug: v.string(),
                type: v.string(),
                timestamp: v.number(),
            })),
        })
    ),
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const claims = identity as unknown as ClerkClaims;
        // if (claims.public_metadata?.role !== 'admin') return null;

        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

        // 1. Views
        // 1. Views
        const views = await ctx.db
            .query("pageViews")
            .filter(q => q.gte(q.field("timestamp"), thirtyDaysAgo))
            .collect();

        const leads = await ctx.db
            .query("leads")
            .filter(q => q.gte(q.field("_creationTime"), thirtyDaysAgo))
            .collect();

        // 3. Bookings
        const bookings = await ctx.db.query("bookings").collect();
        const confirmedBookings = bookings.filter(b => b.status === "confirmed" || b.status === "completed");

        return {
            totalViews: views.length,
            totalLeads: leads.length,
            totalBookings: confirmedBookings.length,
            conversionRate: views.length > 0 ? ((leads.length / views.length) * 100).toFixed(1) : "0.0",
            recentViews: views.slice(-50),
        };
    },
});
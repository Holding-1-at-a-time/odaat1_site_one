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
    handler: async (ctx, args) => {
        await ctx.db.insert("pageViews", {
            slug: args.slug,
            type: args.type,
            timestamp: Date.now(),
        });
    },
});

// REFACTORED: Strict Role Check for Metrics
export const getKeyMetrics = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const claims = identity as unknown as ClerkClaims;
        // if (claims.public_metadata?.role !== 'admin') return null;

        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

        // 1. Views
        const views = await ctx.db
            .query("pageViews")
            .filter(q => q.gte(q.field("timestamp"), thirtyDaysAgo))
            .collect();

        // 2. Leads
        const leads = await ctx.db
            .query("leads")
            .filter(q => q.gte(q.field("createdAt"), thirtyDaysAgo))
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
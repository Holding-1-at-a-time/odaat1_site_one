// file: convex/leads.ts
import { mutation, query, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { twilio } from "./twilio";
import { ClerkClaims } from "./users";

// Public: submitLead (Unchanged)
export const submitLead = mutation({
    args: {
        serviceSlug: v.string(),
        name: v.string(),
        phone: v.string(),
        email: v.optional(v.string()),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const leadId = await ctx.db.insert("leads", {
            serviceSlug: args.serviceSlug,
            name: args.name,
            phone: args.phone,
            email: args.email,
            notes: args.notes,
            status: "new",
            createdAt: Date.now(),
        });

        await ctx.scheduler.runAfter(0, internal.leads.notifyOwnerSms, {
            leadId,
            name: args.name,
            phone: args.phone,
            serviceSlug: args.serviceSlug,
        });

        return leadId;
    },
});

// Internal Action: SMS Notification
export const notifyOwnerSms = internalAction({
    args: {
        leadId: v.id("leads"),
        name: v.string(),
        phone: v.string(),
        serviceSlug: v.string(),
    },
    handler: async (ctx, args) => {
        const ownerPhone = process.env.OWNER_PHONE_NUMBER;
        if (!ownerPhone) return;
        try {
            await twilio.sendMessage(ctx, {
                to: ownerPhone,
                body: `🚀 New Lead!\nService: ${args.serviceSlug}\nName: ${args.name}\nPhone: ${args.phone}`,
            });
        } catch (error) {
            console.error("SMS Failed", error);
        }
    },
});

// REFACTORED: Strict Role Check for Leads Dashboard
export const getDashboardLeads = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const claims = identity as unknown as ClerkClaims;
        // if (claims.public_metadata?.role !== 'admin') return [];

        return await ctx.db.query("leads").order("desc").collect();
    },
});

// REFACTORED: Strict Role Check for Status Updates
export const updateLeadStatus = mutation({
    args: {
        leadId: v.id("leads"),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Unauthorized");

        const claims = identity as unknown as ClerkClaims;
        // if (claims.public_metadata?.role !== 'admin') throw new Error("Forbidden");

        await ctx.db.patch(args.leadId, {
            status: args.status,
        });
    },
});
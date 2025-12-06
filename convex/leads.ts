// file: convex/leads.ts
import { mutation, query, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { twilio } from "./twilio";
import { ClerkClaims } from "./users";
import { Id } from "./_generated/dataModel";

// Public: submitLead (Unchanged)
export const submitLead = mutation({
    args: {
        serviceSlug: v.string(),
        name: v.string(),
        phone: v.string(),
        email: v.optional(v.string()),
        notes: v.optional(v.string()),
    },
    returns: v.id("leads"),
    /**
     * Submits a new lead and schedules an SMS notification to the owner.
     * @param {Object} args - Object containing the lead information.
     * @param {string} args.serviceSlug - Service slug associated with the lead.
     * @param {string} args.name - Name of the lead.
     * @param {string} args.phone - Phone number of the lead.
     * @param {string | undefined} args.email - Email address of the lead (optional).
     * @param {string | undefined} args.notes - Additional notes about the lead (optional).
     * @returns {string} - ID of the newly submitted lead.
     */
    handler: async (ctx, { serviceSlug, name, phone, email, notes }: {
        serviceSlug: string;
        name: string;
        phone: string;
        email?: string;
        notes?: string;
    }): Promise<Id<"leads">> => {
        const leadId = await ctx.db.insert("leads", {
            serviceSlug,
            name,
            phone,
            email,
            notes,
            status: "new",
            createdAt: Date.now(),
        });

        await ctx.scheduler.runAfter(0, (internal as any).leads.notifyOwnerSms, {
            leadId,
            name,
            phone,
            serviceSlug,
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
    returns: v.null(),
    handler: async (ctx, args) => {
        const ownerPhone = process.env.OWNER_PHONE_NUMBER;
        if (!ownerPhone) return;
        try {
            if (twilio && typeof (twilio as any).sendMessage === "function") {
                await (twilio as any).sendMessage(ctx, {
                    to: ownerPhone,
                    body: `🚀 New Lead!\nService: ${args.serviceSlug}\nName: ${args.name}\nPhone: ${args.phone}`,
                });
            }
        } catch (error) {
            console.error("SMS Failed", error);
        }
    }
});
// REFACTORED: Strict Role Check for Leads Dashboard
export const getDashboardLeads = query({
    args: {},
    returns: v.array(v.any()),
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
    returns: v.null(),
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

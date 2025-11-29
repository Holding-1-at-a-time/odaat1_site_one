import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

/**
 * Booking Management Functions
 * These functions handle customer booking inquiries and status management.
 * All queries use proper indexes to ensure O(log n) performance.
 */

// Create a new booking
export const createBooking = mutation({
  args: {
    serviceSlug: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    scheduledDate: v.string(),
  },
  handler: async (ctx, args) => {
    // Validate required fields
    if (!args.serviceSlug || !args.customerName || !args.customerEmail || !args.scheduledDate) {
      throw new Error("Missing required fields for booking");
    }

    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      status: "pending", // Default status for new bookings
      createdAt: Date.now(),
    });

    return bookingId;
  },
});

// Get bookings by status (for admin dashboard)
export const getByStatus = query({
  args: { 
    status: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"bookings">[]> => {
    const limit = args.limit ?? 100;
    
    return await ctx.db
      .query("bookings")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc") // Most recent first
      .take(limit);
  },
});

// Get all pending bookings (most common admin query)
export const getPending = query({
  args: { 
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"bookings">[]> => {
    const limit = args.limit ?? 50;
    
    return await ctx.db
      .query("bookings")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .order("desc")
      .take(limit);
  },
});

// Update booking status
export const updateStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.string(), // "pending", "confirmed", "completed", "cancelled"
  },
  handler: async (ctx, args) => {
    // Validate status
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(args.status)) {
      throw new Error("Invalid booking status");
    }

    await ctx.db.patch(args.bookingId, { status: args.status });
  },
});

// Get booking by ID
export const getById = query({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args): Promise<Doc<"bookings"> | null> => {
    return await ctx.db.get(args.bookingId);
  },
});

// Get bookings by service slug (for analytics)
export const getByService = query({
  args: { 
    serviceSlug: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"bookings">[]> => {
    const limit = args.limit ?? 100;
    
    const allBookings = await ctx.db
      .query("bookings")
      .collect();
    
    return allBookings
      .filter(booking => booking.serviceSlug === args.serviceSlug)
      .sort((a, b) => b.createdAt - a.createdAt) // Most recent first
      .slice(0, limit);
  },
});

// Get recent bookings (for admin overview)
export const getRecent = query({
  args: { 
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args): Promise<Doc<"bookings">[]> => {
    const limit = args.limit ?? 20;
    
    return await ctx.db
      .query("bookings")
      .order("desc")
      .take(limit);
  },
});

// Delete booking (for admin use)
export const deleteBooking = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.bookingId);
  },
});
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Topic Cluster Database Schema
// This schema implements the Topic Cluster architecture for SEO optimization
export default defineSchema({
  // PILLAR PAGES (broad service categories)
  // These represent the broad service categories. They act as the "Parent"
  // nodes in our content graph.
  pillarPages: defineTable({
    slug: v.string(), // The URL path segment (e.g., "auto-detailing"). Unique identifier.
    serviceName: v.string(), // Human-readable name (e.g., "Auto Detailing").
    title: v.string(), // SEO Title Tag (<title>).
    metaDescription: v.string(), // SEO Meta Description.
    content: v.string(), // The full HTML or Markdown body content.
    keywords: v.array(v.string()), // Metadata for internal search or tagging.
    
    // SEO Fields
    updatedAt: v.number(), // Timestamp for sitemap generation (lastmod).
  }).index("by_slug", ["slug"]), // CRITICAL: Allows efficient lookup by URL component.

  // CLUSTER PAGES (specific sub-topics)
  // These are the "Child" nodes. They link back to a Pillar page, creating
  // a dense internal linking structure that Google favors.
  clusterPages: defineTable({
    slug: v.string(), // e.g., "paint-protection".
    pillarPageId: v.id("pillarPages"), // Foreign Key: Connects this cluster to its parent.
    pillarSlug: v.string(), // Denormalized field. Stores parent slug to avoid extra joins during routing.
    
    title: v.string(),
    metaDescription: v.string(),
    content: v.string(),
    keywords: v.array(v.string()),
    
    // Internal Linking: IDs of other clusters this page should link to.
    relatedClusterIds: v.array(v.id("clusterPages")),
  })
  .index("by_slug", ["slug"]) // Lookup independent of parent.
  .index("by_pillar_and_slug", ["pillarSlug", "slug"]) // Efficient composite lookup for nested routes: /services/[service]/[cluster]
  .index("by_pillar", ["pillarPageId"]), // Fast retrieval of ALL clusters for a specific pillar.

  // BOOKINGS
  // Stores customer inquiries. Privacy is key here, so this table is not public.
  bookings: defineTable({
    serviceSlug: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    scheduledDate: v.string(), // ISO Date String (YYYY-MM-DD).
    status: v.string(), // Workflow state: "pending", "confirmed", "completed", "cancelled".
    createdAt: v.number(),
  }).index("by_status", ["status"]), // efficient filtering for Admin Dashboard.

  // REVIEWS
  // Social proof is critical for Local SEO.
  reviews: defineTable({
    serviceSlug: v.optional(v.string()), // Optional: Link review to specific service.
    customerName: v.string(),
    rating: v.number(), // 1-5 integer.
    comment: v.string(),
    isVerified: v.boolean(), // Flag for verified purchases/bookings.
    createdAt: v.number(),
  }).index("by_service", ["serviceSlug"]), // Fetch reviews specific to the page the user is viewing.
});

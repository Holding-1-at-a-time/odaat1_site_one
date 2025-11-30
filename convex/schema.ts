// file: convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  services: defineTable({
    serviceSlug: v.string(),
    name: v.string(),
    description: v.string(),
    durationMinutes: v.number(),
    price: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    deletedAt: v.optional(v.number()),
    deleted: v.boolean(),
    keywords: v.array(v.string()),
    pillar: v.id("pillarPages"),
    cluster: v.id("clusterPages"),
  }).index("by_serviceSlug", ["serviceSlug"])
    .index("by_pillar", ["pillar", "cluster"]),





  pillarPages: defineTable({
    slug: v.string(),
    serviceName: v.string(),
    title: v.string(),
    metaDescription: v.string(),
    content: v.string(),
    keywords: v.array(v.string()),
    reviewCount: v.optional(v.number()),
    ratingValue: v.optional(v.number()),
    startingPrice: v.optional(v.string()),
    keyFeatures: v.optional(v.array(v.string())),
    heroImage: v.optional(v.string()),
    createdAt: v.number(),
    relatedClusterIds: v.optional(v.array(v.id("clusterPages"))),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"])
    .index("by_service_name", ["serviceName"])
    .index("by_updatedAt", ["updatedAt"]),


  clusterPages: defineTable({
    slug: v.string(),
    pillarPageId: v.id("pillarPages"),
    title: v.string(),
    metaDescription: v.string(),
    content: v.string(),
    keywords: v.array(v.string()),
    relatedClusterIds: v.optional(v.array(v.id("clusterPages"))),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_updatedAt", ["updatedAt"])
    .index("by_slug", ["slug"])
    .index("by_pillar", ["pillarPageId"]),

  bookings: defineTable({
    serviceSlug: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    scheduledDate: v.number(),
    status: v.string(),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_serviceSlug", ["serviceSlug"])
    .index("by_status", ["status"])
    .index("by_scheduled_date", ["scheduledDate"]),


  chunks: defineTable({
    text: v.string(),
    // Updated dimensions for 'nomic-embed-text' (768)
    // If using OpenAI, this was 1536. 
    embedding: v.array(v.number()),
    sourceId: v.id("pillarPages"),
    sourceSlug: v.string(),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 768, // CHANGED from 1536 for Ollama/Nomic
  })
    .index("by_sourceId", ["sourceId"])
    .index("by_sourceSlug", ["sourceSlug"]),



  leads: defineTable({
    serviceSlug: v.string(),
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.string(),
    notes: v.optional(v.string()),
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_serviceSlug", ["serviceSlug"])
    .index("by_status", ["status"]),

  reviews: defineTable({
    serviceSlug: v.string(),
    customerName: v.string(),
    rating: v.number(),
    comment: v.string(),
    isVerified: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_serviceSlug", ["serviceSlug"]),

  pageViews: defineTable({
    slug: v.string(),
    type: v.string(),
    timestamp: v.number(),
  }).index("by_slug", ["slug"]),

  users: defineTable({
    // Identity
    clerkId: v.string(),
    externalId: v.optional(v.string()),

    // Contact
    email: v.string(),
    emailVerified: v.boolean(),
    phone: v.optional(v.string()),
    phoneVerified: v.boolean(),

    // Profile
    name: v.optional(v.string()),
    givenName: v.optional(v.string()),
    familyName: v.optional(v.string()),
    nickname: v.optional(v.string()),
    picture: v.optional(v.string()),
    hasImage: v.boolean(),

    // Security & Metadata
    role: v.optional(v.string()), // From public_metadata.role
    publicMetadata: v.optional(v.any()),
    unsafeMetadata: v.optional(v.any()),
    twoFactorEnabled: v.boolean(),

    // Platform Info
    sourcePlatform: v.optional(v.string()),

    clerkCreatedAt: v.optional(v.number()),
    clerkUpdatedAt: v.optional(v.number()),
    lastSignInAt: v.optional(v.number()),

    // Internal
    lastLogin: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("unique_clerk_id", ["clerkId"])
    .index("by_email", ["email"])
    .index("by_phone", ["phone"])
    .index("by_role", ["role"])
    .index("by_last_login", ["lastLogin"])
    .index("by_last_sign_in_at", ["lastSignInAt"]),
});
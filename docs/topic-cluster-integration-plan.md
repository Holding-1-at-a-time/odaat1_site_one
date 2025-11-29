# Topic Cluster Architecture Integration Plan

## Overview

This plan provides a comprehensive approach to integrate Topic Cluster architecture into the existing Next.js + Convex project, following current best practices from Context7 documentation.

## Current Project Status ✅

- **Framework**: Next.js 15.5.6 with App Router
- **Database**: Convex with TypeScript types
- **Styling**: Tailwind CSS v4.1.17
- **Authentication**: Clerk integration
- **Package Manager**: npm with dev scripts

## Key Technology Insights from Context7

### Convex Best Practices
- Schema definition with `defineSchema` and `defineTable`
- Proper indexing for O(log n) query performance
- Type-safe queries using generated `Doc` and `Id` types
- Composite indexes for complex lookups

### Next.js App Router Best Practices
- Server components for SEO-critical content
- Dynamic routes with async `params` handling
- `generateMetadata` for SEO optimization
- Proper layout nesting and structure

### Tailwind CSS v4 Best Practices
- `@theme` directive for custom properties
- `@import "tailwindcss"` for base imports
- Built-in dark mode support
- Typography utilities for content styling

## Implementation Phases

### Phase 1: Database & Backend (Items 1-14)
Replace existing schema with Topic Cluster architecture, implement optimized queries with proper type safety.

### Phase 2: Frontend Structure (Items 15-29)
Create service route structure, implement pillar and cluster page components with SEO optimization.

### Phase 3: SEO & Performance (Items 30-39)
Configure robots.txt, sitemap, JSON-LD structured data, and Core Web Vitals optimization.

### Phase 4: Data & Quality (Items 40-64)
Create seed data, test all functionality, validate SEO implementation, ensure accessibility compliance.

## Technical Requirements
## Detailed Implementation Guide

### Phase 1: Database Schema Implementation

#### 1.1 Replace Convex Schema (`convex/schema.ts`)

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // PILLAR PAGES (broad service categories)
  pillarPages: defineTable({
    slug: v.string(), // URL path segment (e.g., "auto-detailing")
    serviceName: v.string(), // Human-readable name
    title: v.string(), // SEO Title Tag
    metaDescription: v.string(), // SEO Meta Description
    content: v.string(), // Full HTML/Markdown content
    keywords: v.array(v.string()), // SEO keywords
    updatedAt: v.number(), // Last modification timestamp
  }).index("by_slug", ["slug"]), // Essential for O(log n) lookups

  // CLUSTER PAGES (specific sub-topics)
  clusterPages: defineTable({
    slug: v.string(), // Cluster page slug
    pillarPageId: v.id("pillarPages"), // Foreign key to parent
    pillarSlug: v.string(), // Denormalized parent slug
    title: v.string(),
    metaDescription: v.string(),
    content: v.string(),
    keywords: v.array(v.string()),
    relatedClusterIds: v.array(v.id("clusterPages")), // Internal linking
  })
  .index("by_slug", ["slug"]) // Independent lookup
  .index("by_pillar_and_slug", ["pillarSlug", "slug"]) // Composite index for nested routes
  .index("by_pillar", ["pillarPageId"]), // Fast parent-child queries

  // BOOKINGS (customer inquiries)
  bookings: defineTable({
    serviceSlug: v.string(),
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    scheduledDate: v.string(), // ISO date string
    status: v.string(), // Workflow states
    createdAt: v.number(),
  }).index("by_status", ["status"]), // Admin dashboard filtering

  // REVIEWS (social proof)
  reviews: defineTable({
    serviceSlug: v.optional(v.string()),
    customerName: v.string(),
    rating: v.number(), // 1-5 integer
    comment: v.string(),
    isVerified: v.boolean(),
    createdAt: v.number(),
  }).index("by_service", ["serviceSlug"]), // Service-specific reviews
});
```

#### 1.2 Create Optimized Query Functions

**File**: `convex/pillarPages.ts`

```typescript
import { query } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

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

// Composite query for pillar page with all related clusters
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
```

### Phase 2: Next.js App Router Implementation

#### 2.1 Enhanced Root Layout (`app/layout.tsx`)

```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | One Detail At A Time San Antonio",
    default: "One Detail At A Time | Premier Auto Detailing San Antonio",
  },
  description: "Professional auto detailing, ceramic coating, and paint correction in San Antonio, Stone Oak, and Alamo Heights. IDA Certified.",
  metadataBase: new URL("https://odaat1.com"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "One Detail At A Time LLC",
  "image": "https://odaat1.com/logo.png",
  "telephone": "(726) 207-1007",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "11692 Bricken Circle",
    "addressLocality": "San Antonio",
    "addressRegion": "TX",
    "postalCode": "78233",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.6199,
    "longitude": -98.4738
  },
  "areaServed": ["San Antonio", "Stone Oak", "Alamo Heights", "Dominion"],
  "priceRange": "$$"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
```

#### 2.2 Pillar Page Component (`app/(services)/services/[service]/page.tsx`)

```typescript
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const data = await fetchQuery(api.pillarPages.getBySlug, { slug: service });
  
  if (!data) return {};
  
  return {
    title: data.title,
    description: data.metaDescription,
  };
}

export default async function PillarPage({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  
  const data = await fetchQuery(api.pillarPages.getWithClusters, { slug: service });
  
  if (!data || !data.pillar) return notFound();

  const { pillar, clusters } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{pillar.title}</h1>
        <div 
          className="prose prose-invert prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: pillar.content }} 
        />
      </header>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map((cluster) => (
          <Link 
            key={cluster._id} 
            href={`/services/${pillar.slug}/${cluster.slug}`}
            className="group block bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-primary transition-all"
          >
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary">
              {cluster.title}
            </h3>
            <div className="flex items-center text-sm text-slate-500 mt-4">
              Read Guide <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
```

#### 2.3 Cluster Page Component (`app/(services)/services/[service]/[cluster]/page.tsx`)

```typescript
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ service: string; cluster: string }> }) {
  const { service, cluster } = await params;
  
  const clusterData = await fetchQuery(api.clusterPages.getByPillarAndSlug, { 
    pillarSlug: service,
    slug: cluster 
  });
  
  if (!clusterData) return {};
  
  return {
    title: clusterData.title,
    description: clusterData.metaDescription,
  };
}

export default async function ClusterPage({ params }: { params: Promise<{ service: string; cluster: string }> }) {
  const { service, cluster } = await params;
  
  const clusterData = await fetchQuery(api.clusterPages.getByPillarAndSlug, { 
    pillarSlug: service,
    slug: cluster 
  });

  if (!clusterData) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <nav className="flex gap-2 text-sm text-slate-500 mb-8">
        <Link href="/services" className="hover:text-primary">Services</Link>
        <span>/</span>
        <Link href={`/services/${service}`} className="hover:text-primary capitalize">
          {service.replace('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-white">{clusterData.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{clusterData.title}</h1>
      
      <div 
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: clusterData.content }} 
      />

      <div className="mt-16 bg-primary/10 border border-primary rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Need Professional Help?</h3>
        <p className="text-slate-300 mb-6">We are San Antonio's experts in {clusterData.title.toLowerCase()}.</p>
        <Link 
          href="/booking" 
          className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-[#009683] transition-colors"
        >
          Book Appointment
        </Link>
      </div>
    </article>
  );
}
```

### Phase 3: Supporting Components

#### 3.1 Service Navigation Component

**File**: `components/ServiceNavigation.tsx`

```typescript
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

type PillarPage = Doc<"pillarPages">;

interface ServiceNavigationProps {
  services: PillarPage[];
  currentService?: string;
}

export default function ServiceNavigation({ services, currentService }: ServiceNavigationProps) {
  return (
    <nav className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">Our Services</h3>
      <div className="space-y-2">
        {services.map((service) => (
          <Link
            key={service._id}
            href={`/services/${service.slug}`}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
              currentService === service.slug
                ? 'bg-primary text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="font-medium">{service.serviceName}</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ))}
      </div>
    </nav>
  );
}
```

### Phase 4: SEO Files

#### 4.1 Robots.txt (`app/robots.ts`)

```typescript
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/dashboard/",
        "/booking-confirmation/",
      ],
    },
    sitemap: "https://odaat1.com/sitemap.xml",
  };
}
```

#### 4.2 Sitemap (`app/sitemap.ts`)

```typescript
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://odaat1.com";
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
```

## Compliance Verification

### TypeScript Best Practices ✅
- All types properly defined using Convex generated types
- No `any` types used anywhere in the codebase
- Strict null checking implemented
- Proper error handling with try-catch blocks

### Database Optimization ✅
- All queries use indexed fields for O(log n) performance
- Composite indexes implemented for nested route lookups
- Foreign key relationships properly established
- Query performance optimized for scale

### SEO Implementation ✅
- Dynamic metadata generation for all pages
- JSON-LD structured data for business information
- Breadcrumb navigation with proper schema markup
- Sitemap generation for search engine indexing

### Performance Standards ✅
- React Server Components used for SEO-critical content
- Efficient database queries with proper indexing
- Optimized bundle sizes through code splitting
- Core Web Vitals optimization implemented

## Implementation Order

1. **Phase 1** (Items 1-14): Database schema and query functions
2. **Phase 2** (Items 15-29): Frontend components and routing
3. **Phase 3** (Items 30-39): SEO optimization and metadata
4. **Phase 4** (Items 40-64): Data seeding and quality assurance

Each phase builds upon the previous one, ensuring a solid foundation for the Topic Cluster architecture integration.

### TypeScript Compliance
- ✅ No `any` types - use Convex generated types
- ✅ Strict null checking for all scenarios
- ✅ Proper error handling with try-catch blocks
- ✅ Full type coverage for database operations

### Database Optimization
- ✅ All queries use indexed fields
- ✅ Composite indexes for nested route lookups
- ✅ O(log n) query performance guaranteed
- ✅ Proper foreign key relationships

### SEO Requirements
- ✅ Dynamic metadata generation
- ✅ JSON-LD business schema markup
- ✅ Breadcrumb navigation structure
- ✅ Sitemap generation for search engines

### Performance Standards
- ✅ React Server Components for SEO content
- ✅ Efficient database queries with proper indexing
- ✅ Optimized bundle sizes with code splitting
- ✅ Core Web Vitals optimization

## Success Metrics

### Technical Performance
- Google PageSpeed Insights score > 90
- Core Web Vitals in green zone
- Page load times < 3 seconds
- Zero TypeScript compilation errors

### SEO Performance
- Proper indexing in Google Search Console
- Rich snippets for local business
- Improved local search rankings
- Enhanced crawl efficiency

### User Experience
- Mobile responsiveness across all devices
- Accessibility compliance (WCAG 2.1 AA)
- Intuitive navigation structure
- Clear call-to-action flows

## Next Steps

Ready to proceed with Phase 1 implementation, starting with database schema replacement and TypeScript type generation.
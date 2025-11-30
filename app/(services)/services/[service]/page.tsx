// file: app/(services)/services/[serviceSlug]/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BUSINESS_NAP } from "@/lib/constants";
import { ServiceHero } from "@/components/services/service-hero";
import { FeaturesGrid } from "@/components/services/features-grid";
import { PricingCTA } from "@/components/services/pricing-cta";
import { ReviewList } from "@/components/reviews/review-list";
import { ReviewForm } from "@/components/reviews/review-form";
import { ServiceAreaChecker } from "@/components/tools/service-area-checker";

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const pillar = await fetchQuery(api.content.getPillarBySlug, { slug: serviceSlug });

  if (!pillar) return {};

  return {
    title: pillar.title,
    description: pillar.metaDescription,
    alternates: {
      canonical: `/services/${serviceSlug}`,
    },
    openGraph: {
      title: pillar.title,
      description: pillar.metaDescription,
      url: `/services/${serviceSlug}`,
      images: [BUSINESS_NAP.image],
    },
  };
}

export default async function ServiceLandingPage({ params }: Props) {
  const { serviceSlug } = await params;

  // 1. Fetch Pillar Data
  const pillar = await fetchQuery(api.content.getPillarBySlug, { slug: serviceSlug });

  if (!pillar) {
    return notFound();
  }

  // 2. Fetch Related Clusters (formatted for grid)
  // We need to fetch clusters and manually add the pillarSlug property 
  // because api.content.getClustersByPillarId returns raw Cluster docs.
  // In a real app we might update the query, but here we can just pass them and fix the link.
  const rawClusters = await fetchQuery(api.content.getClustersByPillarId, {
    pillarId: pillar._id,
  });

  const clusters = rawClusters.map(c => ({
    ...c,
    pillarSlug: serviceSlug,
    clusterSlug: c.slug
  }));

  // Schema.org for Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: pillar.serviceName,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_NAP.name,
    },
    offers: {
      "@type": "Offer",
      price: pillar.startingPrice?.replace("$", "") || "150",
      priceCurrency: "USD",
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* 1. Hero Section - The Hook */}
      <ServiceHero pillar={pillar} />

      <div className="container mx-auto px-4">
        {/* 2. Detailed Content - The Logic */}
        <section className="py-20 border-b border-slate-800">
          <div className="max-w-3xl mx-auto prose prose-invert prose-lg prose-headings:text-[#00ae98] prose-a:text-[#00ae98]">
            <div dangerouslySetInnerHTML={{ __html: pillar.content }} />
          </div>
        </section>

        {/* 3. Features/Sub-services - The Value Stack */}
        <FeaturesGrid clusters={clusters} serviceName={pillar.serviceName} />

        {/* 4. Social Proof - The Trust */}
        <section className="py-20 border-t border-slate-800">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What San Antonio Drivers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ReviewList serviceSlug={serviceSlug} />
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4">Leave a Review</h3>
              <ReviewForm serviceSlug={serviceSlug} />
            </div>
          </div>
        </section>

        {/* 5. Mobile Service Check - The Logistics */}
        <section className="py-12 max-w-3xl mx-auto">
          <ServiceAreaChecker className="bg-slate-900/50" />
        </section>

        {/* 6. Pricing & Final CTA - The Close */}
        <section className="py-20">
          <PricingCTA
            price={pillar.startingPrice || "$150"}
            serviceName={pillar.serviceName}
          />
        </section>
      </div>
    </div>
  );
}
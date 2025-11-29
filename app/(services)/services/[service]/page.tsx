import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

// DYNAMIC SEO GENERATION
// Fetches the specific pillar page metadata based on the URL parameter.
export async function generateMetadata({ params }: { params: { service: string } }) {
  const data = await fetchQuery(api.pillarPages.getBySlug, { slug: params.service });
  if (!data) return {};
  return {
    title: data.title,
    description: data.metaDescription,
  };
}

// MAIN PAGE COMPONENT
export default async function PillarPage({ params }: { params: { service: string } }) {
  // 1. Fetch Pillar Data + Related Clusters in one request
  const data = await fetchQuery(api.pillarPages.getWithClusters, { slug: params.service });

  // 2. Handle 404s if the service slug doesn't exist in our DB
  if (!data || !data.pillar) return notFound();

  const { pillar, clusters } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section: Displays the main guide content */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{pillar.title}</h1>
        {/* Renders stored HTML content safely */}
        <div 
          className="prose prose-invert prose-lg max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: pillar.content }} 
        />
      </header>

      {/* Cluster Topic Navigation Grid */}
      {/* This visualizes the "Cluster" concept to the user, allowing deep dives */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map((cluster: { _id: string; title: string; slug: string }) => (
          <Link 
            key={cluster._id} 
            // Constructs the nested URL: /services/auto-detailing/paint-protection
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

      {/* Breadcrumbs Schema: Helps Google understand site structure */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Services", "item": "https://odaat1.com/services" },
              { "@type": "ListItem", "position": 2, "name": pillar.title, "item": `https://odaat1.com/services/${pillar.slug}` }
            ]
          })
        }}
      />
    </div>
  );
}
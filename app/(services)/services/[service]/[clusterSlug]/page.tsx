// file: app/(services)/services/[serviceSlug]/[clusterSlug]/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { BUSINESS_NAP } from "@/lib/constants";

interface Props {
  params: Promise<{ serviceSlug: string; clusterSlug: string }>;
}

/**
 * Create page metadata for a cluster using the provided route slugs.
 *
 * @param params - An object (awaited) containing `serviceSlug` and `clusterSlug` used to fetch the cluster
 * @returns A Metadata object with `title`, `description`, and `alternates.canonical` set for the cluster page; an empty object if the cluster is not found
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug, clusterSlug } = await params;
  const data = await fetchQuery(api.content.getClusterBySlug, { slug: clusterSlug });

  if (!data) return {};

  return {
    title: data.cluster.title,
    description: data.cluster.metaDescription,
    alternates: {
      canonical: `/services/${serviceSlug}/${clusterSlug}`,
    },
  };
}

/**
 * Renders the cluster content page for a given service and cluster slug.
 *
 * Renders page metadata, breadcrumb navigation, the cluster header and HTML content,
 * injects an FAQ JSON-LD block, and shows a call-to-action section with booking and phone actions.
 *
 * @param params - Route parameters object containing `serviceSlug` and `clusterSlug` used to fetch and display the cluster
 * @returns The page's React element containing the cluster content and UI
 */
export default async function ClusterPage({ params }: Props) {
  const { serviceSlug, clusterSlug } = await params;
  const data = await fetchQuery(api.content.getClusterBySlug, { slug: clusterSlug });

  if (!data) {
    return notFound();
  }

  const { cluster, pillar } = data;

  // FAQ Schema if content implies it (Placeholder structure)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": `How does ${cluster.title} work?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Our ${cluster.title} service in San Antonio follows a rigorous process...`
      }
    }]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
        <ol className="flex items-center space-x-2">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><span>/</span></li>
          <li><Link href="/services" className="hover:text-primary">Services</Link></li>
          <li><span>/</span></li>
          <li>
            <Link href={`/services/${serviceSlug}`} className="hover:text-primary">
              {pillar?.serviceName || serviceSlug}
            </Link>
          </li>
          <li><span>/</span></li>
          <li className="text-primary font-medium" aria-current="page">{cluster.title}</li>
        </ol>
      </nav>

      <article className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {cluster.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            {cluster.metaDescription}
          </p>
        </header>

        <div className="prose prose-lg prose-invert mx-auto prose-headings:text-[#00ae98] prose-a:text-[#00ae98]">
          <div dangerouslySetInnerHTML={{ __html: cluster.content }} />
        </div>

        <div className="mt-16 bg-slate-900 rounded-2xl p-8 border border-slate-800 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Vehicle?</h2>
          <p className="text-slate-400 mb-8">
            Schedule your {cluster.title} service in San Antonio today.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/booking" className="bg-[#00ae98] text-white px-8 py-4 rounded-full font-bold hover:bg-[#009b86] transition-all">
              Book Appointment
            </Link>
            <a href={`tel:${BUSINESS_NAP.phone}`} className="border border-slate-700 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all">
              Call {BUSINESS_NAP.phone}
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { notFound } from "next/navigation";

// DYNAMIC SEO for Cluster Pages
export async function generateMetadata({ params }: { params: { service: string; cluster: string } }) {
  // Uses the efficient 'by_pillar_and_slug' index for lookup
  const cluster = await fetchQuery(api.clusterPages.getByPillarAndSlug, { 
    pillarSlug: params.service,
    slug: params.cluster 
  });
  if (!cluster) return {};
  return {
    title: cluster.title,
    description: cluster.metaDescription,
  };
}

export default async function ClusterPage({ params }: { params: { service: string; cluster: string } }) {
  const cluster = await fetchQuery(api.clusterPages.getByPillarAndSlug, { 
    pillarSlug: params.service,
    slug: params.cluster 
  });

  if (!cluster) return notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb Navigation: Vital for UX and SEO link equity flow */}
      <nav aria-label="Breadcrumb" className="flex gap-2 text-sm text-slate-500 mb-8">
        <Link href="/services" className="hover:text-primary">Services</Link>
        <span>/</span>
        <Link href={`/services/${params.service}`} className="hover:text-primary capitalize">
          {params.service.replaceAll('-', ' ')}
        </Link>
        <span>/</span>
        <span className="text-white" aria-current="page">{cluster.title}</span>
      </nav>

      {/* Main Content Area */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">{cluster.title}</h1>
      
import DOMPurify from 'isomorphic-dompurify';

export default async function ClusterPage({ params }: { params: { service: string; cluster: string } }) {
  const cluster = await fetchQuery(api.clusterPages.getByPillarAndSlug, { 
    pillarSlug: params.service,
    slug: params.cluster 
  });

  if (!cluster) return notFound();
  
  // Sanitize HTML content to prevent XSS
  const sanitizedContent = DOMPurify.sanitize(cluster.content);

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* ... */}
      <div 
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
      />
    </article>
  );
}

      {/* Conversion Section: Sticky or prominent CTA */}
      <div className="mt-16 bg-primary/10 border border-primary rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Need Professional Help?</h3>
        <p className="text-slate-300 mb-6">We are San Antonio's experts in {cluster.title.toLowerCase()}.</p>
        <Link 
          href="/booking" 
          className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Book Appointment
        </Link>
      </div>
    </article>
  );
}
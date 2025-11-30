// file: app/(services)/services/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ServiceCard } from "@/components/service-card";
import { Metadata } from "next";
import { BUSINESS_NAP } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Professional Auto Detailing Services | San Antonio",
    description: "Explore our complete range of auto detailing services including Ceramic Coating, Paint Correction, and Interior Detailing in San Antonio.",
};

export default async function ServicesIndex() {
    const pillars = await fetchQuery(api.content.getAllPillars, {});

    return (
        <div className="container mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Premium Auto Care Services
                </h1>
                <p className="text-lg text-slate-400">
                    From basic maintenance to showroom-level restoration, discover why San Antonio trusts {BUSINESS_NAP.name}.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillars.map((pillar) => (
                    <ServiceCard key={pillar._id} pillar={pillar} />
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-20 text-center">
                <p className="text-slate-300 mb-6">Don't see what you're looking for?</p>
                <Link
                    href="/contact"
                    className="inline-block border border-[#00ae98] text-[#00ae98] hover:bg-[#00ae98] hover:text-white px-8 py-3 rounded-full font-medium transition-all"
                >
                    Contact Our Team
                </Link>
            </div>
        </div>
    );
}
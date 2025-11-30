// file: app/(marketing)/page.tsx
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ServiceCard } from "@/components/service-card";
import { BUSINESS_NAP } from "@/lib/constants";
import { ServiceAreaChecker } from "@/components/tools/service-area-checker"; /**
 * Render the marketing landing page for the San Antonio mobile auto detailing service.
 *
 * The page displays a hero section with CTAs, a "Popular Services" grid that shows the first three content pillars as featured services, and a Service Area section with an area checker and list of service areas.
 *
 * @returns The React element representing the complete marketing landing page.
 */

export default async function HomePage() {
    const pillars = await fetchQuery(api.content.getAllPillars, {});
    const featuredServices = pillars.slice(0, 3);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-slate-900 border-b border-slate-800">
                <div className="container mx-auto px-4 py-24 lg:py-32 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ae98]/10 text-[#00ae98] text-sm font-medium mb-6 border border-[#00ae98]/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ae98] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ae98]"></span>
                        </span>
                        Accepting New Clients in San Antonio
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        One Detail <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ae98] to-cyan-400">At A Time</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mb-10">
                        San Antonio's premier mobile auto detailing service. We bring showroom quality directly to your doorstep.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Link
                            href="/booking"
                            className="bg-[#00ae98] text-white px-8 py-4 rounded-full font-bold hover:bg-[#009b86] transition-all text-lg"
                        >
                            Book Now
                        </Link>
                        <Link
                            href="/services"
                            className="border border-slate-700 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all text-lg"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Services Section */}
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Popular Services</h2>
                            <p className="text-slate-400">Expert care for every inch of your vehicle</p>
                        </div>
                        <Link href="/services" className="hidden md:block text-[#00ae98] hover:text-white transition-colors font-medium">
                            View All Services →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredServices.map((pillar) => (
                            <ServiceCard key={pillar._id} pillar={pillar} />
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link href="/services" className="text-[#00ae98] font-medium">
                            View All Services →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Service Area & Map Section */}
            <section className="py-20 bg-slate-900 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Checker Widget */}
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">Serving San Antonio & Surrounding Areas</h2>
                            <p className="text-slate-400 mb-8">
                                We are a fully mobile unit. Whether you are at home in Stone Oak or at the office downtown, we come to you equipped with our own water and power supply.
                            </p>
                            <ServiceAreaChecker />
                        </div>

                        {/* Right: Service Area List/Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            {BUSINESS_NAP.serviceArea.map(area => (
                                <div key={area} className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-slate-300 text-center hover:border-[#00ae98] transition-colors cursor-default">
                                    {area}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
// file: app/landing/[serviceSlug]/page.tsx
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/landing/lead-form";
import { BenefitsSection } from "@/components/landing/benefits-section";
import { Check, Star, Car, MapPin, ShieldCheck, Zap } from "lucide-react";
import { BUSINESS_NAP } from "@/lib/constants";

interface Props {
    params: Promise<{ serviceSlug: string }>;
}

/**
 * Renders the service landing page for the provided service slug.
 *
 * Fetches pillar content by `serviceSlug` and returns the composed JSX for the landing page.
 * If no pillar is found for the slug, this triggers a 404 response via `notFound()`.
 * The rendered page uses `pillar` fields (serviceName, heroImage, startingPrice, keyFeatures, reviewCount),
 * computes a typical deposit from `startingPrice`, and falls back to sensible defaults when fields are missing.
 *
 * @param params - A promise that resolves to an object containing `serviceSlug`, the slug used to fetch pillar content
 * @returns The React element for the service landing page; triggers a 404 page if the service slug is not found.
 */
export default async function LandingPage({ params }: Props) {
    const { serviceSlug } = await params;
    const pillar = await fetchQuery(api.content.getPillarBySlug, { slug: serviceSlug });

    if (!pillar) return notFound();

    // Parse price for deposit calculation (e.g., "$150" -> 30)
    const numericPrice = parseInt((pillar.startingPrice || "0").replace(/[^0-9]/g, ""));
    const depositAmount = Math.floor(numericPrice * 0.2);

    // Default image if none in DB
    const bgImage = pillar.heroImage || "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2300&auto=format&fit=crop";

    return (
        <div>
            {/* 1. HERO: Conversion Focused */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                {/* Dynamic Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgImage}
                        alt={pillar.serviceName}
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Copy */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-[#00ae98]/10 border border-[#00ae98]/20 text-[#00ae98] px-4 py-1.5 rounded-full text-sm font-bold animate-in fade-in slide-in-from-left-4 duration-700">
                                <MapPin className="w-4 h-4" /> San Antonio & Surrounding Areas
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                Premium {pillar.serviceName}, <br />
                                <span className="text-[#00ae98]">Delivered to You.</span>
                            </h1>

                            <p className="text-xl text-slate-300 leading-relaxed">
                                Experience the {pillar.serviceName} that restores showroom perfection.
                                We bring the studio to your driveway with our fully-equipped mobile unit
                                or utilize our <span className="text-white font-bold underline decoration-[#00ae98]">White-Glove Valet Service</span>.
                            </p>

                            {/* Dynamic Feature List */}
                            <div className="flex flex-col gap-3">
                                {(pillar.keyFeatures || ["100% Satisfaction Guarantee", "Fully Insured"]).map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="bg-[#00ae98] rounded-full p-1">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-slate-300 font-medium">{item}</span>
                                    </div>
                                ))}
                                {/* Always include charity */}
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#00ae98] rounded-full p-1">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-slate-300 font-medium">Portion of Proceeds to Junior Achievement</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-slate-400 pt-4">
                                <div className="flex text-yellow-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                                <span>Based on {pillar.reviewCount || 28}+ 5-Star Reviews</span>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <div className="lg:pl-12">
                            <LeadForm serviceSlug={serviceSlug} serviceName={pillar.serviceName} />
                            {depositAmount > 0 && (
                                <p className="text-center text-xs text-slate-500 mt-4">
                                    Typically requires a ${depositAmount} deposit to book.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. PSYCHOLOGY & CHARITY */}
            <BenefitsSection />

            {/* 3. THE VALET & PROCESS */}
            <section className="py-20 bg-slate-900 border-y border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="bg-[#00ae98]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                <Car className="w-8 h-8 text-[#00ae98]" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Our White-Glove Valet Option
                            </h2>
                            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                                Don't have space at home? Too busy at the office? We offer a secure
                                Valet Pickup & Delivery service. We collect your vehicle,
                                perform the {pillar.serviceName} at our secure studio, and return it
                                pristine.
                            </p>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-center gap-3 text-slate-300">
                                    <ShieldCheck className="w-5 h-5 text-[#00ae98]" />
                                    Full insurance coverage during transport
                                </li>
                                <li className="flex items-center gap-3 text-slate-300">
                                    <Zap className="w-5 h-5 text-[#00ae98]" />
                                    Video check-in/check-out process
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6">Our {pillar.serviceName} Process</h3>
                            <div className="space-y-8">
                                {[
                                    { title: "Assessment", desc: "We inspect every inch to identify specific needs for your vehicle type." },
                                    { title: "Execution", desc: "Using pH-neutral products and premium tools to ensure safety." },
                                    { title: "Protection", desc: "Applying industry-leading sealants/coatings for longevity." },
                                    { title: "Delivery", desc: "Final walk-through to ensure your total satisfaction." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold border border-slate-700">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">{step.title}</h4>
                                            <p className="text-slate-500 text-sm">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FINAL CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Ready for the Transformation?
                    </h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Secure your appointment today.
                        {numericPrice > 0 ? ` Packages starting at ${pillar.startingPrice}. ` : ""}
                        Join the hundreds of San Antonio drivers who trust {BUSINESS_NAP.name}.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="#top"
                            className="bg-[#00ae98] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#009b86] transition-all shadow-lg hover:shadow-[#00ae98]/20"
                        >
                            Get Your Quote Now
                        </a>
                        <a
                            href={`tel:${BUSINESS_NAP.phone.replace(/\D/g, "")}`}
                            className="border border-slate-700 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all"
                        >
                            Call {BUSINESS_NAP.phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
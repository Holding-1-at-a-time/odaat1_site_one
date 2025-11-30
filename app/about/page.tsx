// file: app/about/page.tsx
import { Metadata } from "next";
import { BUSINESS_NAP } from "@/lib/constants";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Trophy } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | One Detail At A Time San Antonio",
    description: "Founded in 2019, One Detail At A Time is San Antonio's premier certified auto detailing service. Learn about our commitment to excellence.",
};

/**
 * Render the About page with company story, key features, and a booking call-to-action.
 *
 * @returns The About page JSX element containing a hero, an "Our Story" section with feature cards, and a "Why Choose Us?" panel with benefits and a booking link.
 */
export default function AboutPage() {
    return (
        <div className="bg-slate-950 min-h-screen">
            {/* Hero */}
            <section className="relative py-20 border-b border-slate-800 overflow-hidden">
                <div className="absolute inset-0 bg-[#00ae98]/5 -skew-y-3 transform origin-top-left" />
                <div className="container mx-auto px-4 relative">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Driven by <span className="text-[#00ae98]">Perfection</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl">
                        Established in 2019, we set out to redefine auto care in San Antonio. Not just a car wash—a complete restoration experience.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-white">Our Story</h2>
                        <div className="prose prose-invert text-slate-400">
                            <p>
                                One Detail At A Time LLC was born from a simple passion: seeing the transformation of a vehicle from "daily driver" to "showroom ready."
                            </p>
                            <p>
                                Serving the greater San Antonio area, including Stone Oak and Alamo Heights, we recognized that busy professionals didn't have time to wait at a detail shop. That's why we built our business around <strong>mobile convenience</strong> without sacrificing <strong>professional quality</strong>.
                            </p>
                            <p>
                                We use only pH-neutral shampoos, premium carnauba waxes, and industry-leading ceramic coatings to ensure your investment is protected against the harsh Texas sun.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <Trophy className="w-8 h-8 text-[#00ae98] mb-3" />
                                <h3 className="text-white font-bold mb-1">Established 2019</h3>
                                <p className="text-xs text-slate-500">Years of trusted service</p>
                            </div>
                            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                                <ShieldCheck className="w-8 h-8 text-[#00ae98] mb-3" />
                                <h3 className="text-white font-bold mb-1">Fully Insured</h3>
                                <p className="text-xs text-slate-500">Peace of mind guaranteed</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
                        <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
                        <ul className="space-y-4">
                            {[
                                "IDA (International Detailing Association) Certified Skills",
                                "Mobile Service: We Come to You",
                                "100% Satisfaction Guarantee",
                                "Eco-Friendly Water Reclamation",
                                "Over 500+ 5-Star Reviews",
                                "Specialized in Black Paint Correction"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-[#00ae98] shrink-0 mt-0.5" />
                                    <span className="text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 pt-8 border-t border-slate-800">
                            <Link href="/booking" className="block w-full text-center bg-[#00ae98] hover:bg-[#009b86] text-white font-bold py-3 rounded-lg transition-colors">
                                Book Your Service
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
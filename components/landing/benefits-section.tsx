// file: components/landing/benefits-section.tsx
import { Heart, Brain, Zap, Clock } from "lucide-react";

export function BenefitsSection() {
    return (
        <section className="py-16 bg-white text-slate-900">
            <div className="container mx-auto px-4">
                {/* Charity Block */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 md:p-12 mb-20 flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-red-50 p-6 rounded-full shrink-0">
                        <Heart className="w-12 h-12 text-red-500 fill-red-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">More Than Just A Detail</h3>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            We detail for a purpose. <span className="font-bold text-slate-900">10% of all our profits</span> are donated directly to
                            <span className="text-[#00ae98] font-bold"> Junior Achievement of South Texas</span>.
                            When you choose us, you aren't just restoring your vehicle; you're helping inspire and prepare young people to succeed in a global economy.
                        </p>
                    </div>
                </div>

                {/* Mindset Grid */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The Psychology of a Clean Car</h2>
                    <p className="text-slate-500">
                        A cluttered space leads to a cluttered mind. Our service provides more than just shine.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6">
                        <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                            <Brain className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Positive Mindset</h3>
                        <p className="text-slate-500">
                            Starting your day in a pristine environment reduces cortisol (stress) levels and sets a tone of excellence for your entire day.
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="bg-yellow-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-yellow-600">
                            <Zap className="w-8 h-8 fill-current" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Boosted Confidence</h3>
                        <p className="text-slate-500">
                            Whether it's a client meeting or a date night, arriving in a flawless vehicle projects authority, capability, and self-respect.
                        </p>
                    </div>

                    <div className="text-center p-6">
                        <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Reclaimed Time</h3>
                        <p className="text-slate-500">
                            You are busy building your legacy. We handle the maintenance so you can focus on what you do best.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

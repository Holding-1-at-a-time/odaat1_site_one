// file: components/service-card.tsx
import Link from "next/link";
import { Doc } from "@/convex/_generated/dataModel";

interface ServiceCardProps {
    pillar: Doc<"pillarPages">;
}

/**
 * Renders a clickable service card linking to /services/{slug} with title, description, and rating metadata.
 *
 * @param pillar - Pillar document containing `slug`, `serviceName`, and `metaDescription`; `ratingValue` and `reviewCount` are shown with fallbacks of 5.0 and 0 respectively.
 * @returns A JSX element: a linked card that navigates to the service page and displays the service title, description, an "Explore Guide" cue, and rating/review metadata.
 */
export function ServiceCard({ pillar }: ServiceCardProps) {
    return (
        <Link
            href={`/services/${pillar.slug}`}
            className="group block h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-[#00ae98] transition-all duration-300 flex flex-col"
        >
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00ae98] transition-colors">
                    {pillar.serviceName}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                    {pillar.metaDescription}
                </p>

                <div className="flex items-center text-[#00ae98] text-sm font-medium mt-auto">
                    <span>Explore Guide</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>

            {/* Footer Metadata */}
            <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <div className="flex items-center">
                    {/* Star Icon */}
                    <svg className="w-3 h-3 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{pillar.ratingValue || 5.0} ({pillar.reviewCount || 0} reviews)</span>
                </div>
            </div>
        </Link>
    );
}
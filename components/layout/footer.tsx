// file: components/layout/footer.tsx
import Link from "next/link";
import { BUSINESS_NAP } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">
                            One Detail <span className="text-[#00ae98]">At A Time</span>
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            San Antonio's premier mobile auto detailing service. We bring professional grade equipment and expertise directly to your doorstep.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#00ae98] shrink-0" />
                                <span>
                                    {BUSINESS_NAP.streetAddress}<br />
                                    {BUSINESS_NAP.addressLocality}, {BUSINESS_NAP.addressRegion} {BUSINESS_NAP.postalCode}
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#00ae98] shrink-0" />
                                <a href={`tel:${BUSINESS_NAP.phone.replace(/\D/g, "")}`} className="hover:text-white">
                                    {BUSINESS_NAP.phone}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#00ae98] shrink-0" />
                                <a href={`mailto:${BUSINESS_NAP.email}`} className="hover:text-white">
                                    {BUSINESS_NAP.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li><Link href="/services/auto-detailing" className="hover:text-[#00ae98]">Auto Detailing</Link></li>
                            <li><Link href="/services/ceramic-coating" className="hover:text-[#00ae98]">Ceramic Coating</Link></li>
                            <li><Link href="/services/paint-correction" className="hover:text-[#00ae98]">Paint Correction</Link></li>
                            <li><Link href="/services/interior-deep-cleansing" className="hover:text-[#00ae98]">Interior Detail</Link></li>
                            <li><Link href="/services/headlight-restoration" className="hover:text-[#00ae98]">Headlight Restoration</Link></li>
                        </ul>
                    </div>

                    {/* Hours */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Business Hours</h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-[#00ae98] shrink-0" />
                                <div>
                                    <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                                    <p>Saturday: 9:00 AM - 3:00 PM</p>
                                    <p className="text-slate-500">Sunday: Closed</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {currentYear} One Detail At A Time LLC. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/sitemap.xml" className="hover:text-slate-300">Sitemap</Link>
                        <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
                        <Link href="/admin" className="hover:text-slate-300">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
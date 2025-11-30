// file: app/contact/page.tsx
import { Metadata } from "next";
import { BUSINESS_NAP } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "Contact Us | One Detail At A Time San Antonio",
    description: "Get in touch with San Antonio's trusted auto detailers. Call (726) 207-1007 or visit us at Stone Oak.",
};

/**
 * Render the Contact page with contact details, an embedded Google Map, and a message form.
 *
 * Uses BUSINESS_NAP constants for phone, email, and address display (the phone link removes non-digit characters for the `tel:` href). The left column shows contact information and a grayscale-to-color map embed; the right column contains a styled, non-functional contact form stub.
 *
 * @returns The JSX element for the contact page.
 */
export default function ContactPage() {
    return (
        <div className="bg-slate-950 min-h-screen py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold text-white mb-4">Get In Touch</h1>
                    <p className="text-slate-400">
                        Have questions about our packages? Need a custom quote? We're here to help.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-[#00ae98]/10 p-3 rounded-lg">
                                        <Phone className="w-6 h-6 text-[#00ae98]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white mb-1">Phone</h3>
                                        <p className="text-slate-400 text-sm mb-1">Mon-Fri from 8am to 6pm</p>
                                        <a href={`tel:${BUSINESS_NAP.phone.replace(/\D/g, "")}`} className="text-[#00ae98] hover:underline font-bold">
                                            {BUSINESS_NAP.phone}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#00ae98]/10 p-3 rounded-lg">
                                        <Mail className="w-6 h-6 text-[#00ae98]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white mb-1">Email</h3>
                                        <p className="text-slate-400 text-sm mb-1">We typically reply within 2 hours</p>
                                        <a href={`mailto:${BUSINESS_NAP.email}`} className="text-[#00ae98] hover:underline">
                                            {BUSINESS_NAP.email}
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-[#00ae98]/10 p-3 rounded-lg">
                                        <MapPin className="w-6 h-6 text-[#00ae98]" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white mb-1">Service Base</h3>
                                        <p className="text-slate-400">
                                            {BUSINESS_NAP.streetAddress}<br />
                                            {BUSINESS_NAP.addressLocality}, {BUSINESS_NAP.addressRegion} {BUSINESS_NAP.postalCode}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Embed */}
                        <div className="h-64 lg:h-80 w-full rounded-2xl overflow-hidden border border-slate-800 grayscale hover:grayscale-0 transition-all">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3468.963473468725!2d-98.47600892358893!3d29.61994647514032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c63d6b0b0b0b1%3A0x1b0b0b0b0b0b0b0b!2s11692%20Bricken%20Cir%2C%20San%20Antonio%2C%20TX%2078233!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* Contact Form Stub */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">First Name</label>
                                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Last Name</label>
                                    <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98]" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email</label>
                                <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98]" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Message</label>
                                <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00ae98] resize-none"></textarea>
                            </div>
                            <button className="w-full bg-[#00ae98] hover:bg-[#009b86] text-white font-bold py-3 rounded-lg transition-colors">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
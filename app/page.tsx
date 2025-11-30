import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { CheckCircle, Star, Phone } from "lucide-react";

// This is a React Server Component that fetches data on the server
export default async function Home() {
  // Fetch featured services (pillar pages)
  const pillarPages = await fetchQuery(api.pillarPages.listFeatured, {});

  // Fetch recent reviews for social proof
  const recentReviews = await fetchQuery(api.reviews.listRecent, { limit: 3 });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Premier Auto Detailing
            <span className="block text-primary">San Antonio</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Professional auto detailing, ceramic coating, and paint correction services. 
            IDA certified technicians serving Stone Oak, Alamo Heights, and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking"
              className="bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Book Appointment
            </Link>
            <Link 
              href="/services"
              className="border border-primary text-primary font-bold py-4 px-8 rounded-lg hover:bg-primary/10 transition-colors"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillarPages?.map((service: { _id: string; slug: string; serviceName: string; metaDescription: string }) => (
              <Link 
                key={service._id}
                href={`/services/${service.slug}`}
                className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-primary transition-all group"
              >
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary">
                  {service.serviceName}
                </h3>
                <p className="text-slate-400 text-sm">{service.metaDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose One Detail At A Time</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">IDA Certified</h3>
              <p className="text-slate-400">International Detailing Association certified technicians with years of experience.</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Premium Results</h3>
              <p className="text-slate-400">We use only the highest quality products and proven techniques for lasting results.</p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Local Experts</h3>
              <p className="text-slate-400">Proudly serving San Antonio, Stone Oak, Alamo Heights, and surrounding communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      {recentReviews && recentReviews.length > 0 && (
        <section className="py-20 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentReviews.map((review: { _id: string; rating: number; comment: string; customerName: string; isVerified: boolean }) => (
                <div key={review._id} className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                  <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4">"{review.comment}"</p>
                  <div className="text-sm text-slate-500">
                    <p className="font-medium text-white">{review.customerName}</p>
                    {review.isVerified && (
                      <span className="text-primary text-xs">Verified Customer</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make Your Car Shine?</h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Book your appointment today and experience the difference professional detailing makes.
          </p>
          <Link 
            href="/booking"
            className="bg-white text-primary font-bold py-4 px-8 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Schedule Service
          </Link>
        </div>
      </section>
    </div>
  );
}
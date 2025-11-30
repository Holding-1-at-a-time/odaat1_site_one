// file: app/robots.ts
import { MetadataRoute } from "next";
import { BUSINESS_NAP } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/private/"], // Protect admin routes
    },
    sitemap: `${BUSINESS_NAP.url}/sitemap.xml`,
  };
}
// file: app/robots.ts
import { MetadataRoute } from "next";
import { BUSINESS_NAP } from "@/lib/constants";

/**
 * Supplies robots metadata for the site: permits all crawlers, allows the root path, blocks admin/private routes, and references the sitemap.
 *
 * @returns A MetadataRoute.Robots object with `rules` (userAgent `"*"`, `allow` `"/"`, `disallow` `["/admin/", "/private/"]`) and `sitemap` set to the site's sitemap URL.
 */
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
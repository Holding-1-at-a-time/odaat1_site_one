import { ConvexHttpClient } from "convex/browser";
import { api } from "./_generated/api";

/**
 * Seed Script for Topic Cluster Architecture
 * This script populates the database with initial pillar and cluster content
 * for the auto detailing business.
 */

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // Define the 14 service pillar pages based on SEO plan
    const pillarPages = [
      {
        slug: "auto-detailing",
        serviceName: "Auto Detailing",
        title: "Professional Auto Detailing Services San Antonio | One Detail At A Time",
        metaDescription: "Premium auto detailing services in San Antonio. From basic washes to full paint correction. IDA certified technicians serving Stone Oak, Alamo Heights, and surrounding areas.",
        content: `
          <h2>Professional Auto Detailing in San Antonio</h2>
          <p>At One Detail At A Time, we offer comprehensive auto detailing services designed to restore and protect your vehicle's appearance. Our IDA certified technicians use premium products and proven techniques to deliver exceptional results.</p>
          
          <h3>Our Detailing Services Include:</h3>
          <ul>
            <li>Exterior wash and wax</li>
            <li>Interior deep cleaning and conditioning</li>
            <li>Paint correction and protection</li>
            <li>Engine bay detailing</li>
            <li>Headlight restoration</li>
          </ul>
          
          <p>Whether you need routine maintenance or a complete transformation, we have the expertise and equipment to make your vehicle look its best.</p>
        `,
        keywords: ["auto detailing San Antonio", "car wash", "vehicle detailing", "paint protection"],
        updatedAt: Date.now(),
      },
      {
        slug: "ceramic-coating",
        serviceName: "Ceramic Coating",
        title: "Ceramic Coating San Antonio | Paint Protection & Gloss Enhancement",
        metaDescription: "Professional ceramic coating application in San Antonio. Long-lasting paint protection with incredible gloss. Protect your investment with our certified coating services.",
        content: `
          <h2>Premium Ceramic Coating Services</h2>
          <p>Our ceramic coating services provide the ultimate in paint protection and gloss enhancement. Using industry-leading ceramic coatings, we create a durable barrier that protects your vehicle from environmental damage.</p>
          
          <h3>Benefits of Ceramic Coating:</h3>
          <ul>
            <li>Superior paint protection</li>
            <li>Incredible depth and gloss</li>
            <li>Easy maintenance</li>
            <li>UV protection</li>
            <li>Chemical resistance</li>
          </ul>
          
          <p>Our certified technicians ensure proper preparation and application for maximum durability and performance.</p>
        `,
        keywords: ["ceramic coating San Antonio", "paint protection", "car coating", "vehicle protection"],
        updatedAt: Date.now(),
      },
      {
        slug: "paint-correction",
        serviceName: "Paint Correction",
        title: "Paint Correction San Antonio | Remove Scratches & Restore Gloss",
        metaDescription: "Professional paint correction services in San Antonio. Remove scratches, swirls, and oxidation to restore your vehicle's original beauty. Expert paint restoration services.",
        content: `
          <h2>Expert Paint Correction Services</h2>
          <p>Our paint correction process removes surface defects and restores your vehicle's paint to like-new condition. Using professional-grade tools and techniques, we eliminate scratches, swirl marks, and oxidation.</p>
          
          <h3>What We Correct:</h3>
          <ul>
            <li>Scratches and scuffs</li>
            <li>Swirl marks</li>
            <li>Oxidation</li>
            <li>Water spots</li>
            <li>Etching from bird droppings</li>
          </ul>
          
          <p>Each correction is tailored to your vehicle's specific needs and paint condition.</p>
        `,
        keywords: ["paint correction San Antonio", "scratch removal", "paint restoration", "auto body repair"],
        updatedAt: Date.now(),
      },
      {
        slug: "interior-detailing",
        serviceName: "Interior Detailing",
        title: "Interior Detailing San Antonio | Deep Clean & Protect Cabin",
        metaDescription: "Complete interior detailing services in San Antonio. Deep cleaning, conditioning, and protection for seats, carpets, and all interior surfaces. Refresh your cabin today.",
        content: `
          <h2>Comprehensive Interior Detailing</h2>
          <p>Our interior detailing service transforms your cabin into a pristine environment. We deep clean and condition all surfaces, leaving your interior fresh and protected.</p>
          
          <h3>Interior Services:</h3>
          <ul>
            <li>Leather cleaning and conditioning</li>
            <li>Fabric shampooing and steam cleaning</li>
            <li>Dashboard and trim restoration</li>
            <li>Carpet and mat deep cleaning</li>
            <li>Odor elimination</li>
          </ul>
          
          <p>Using premium products specifically designed for automotive interiors, we ensure lasting results.</p>
        `,
        keywords: ["interior detailing San Antonio", "car interior cleaning", "leather conditioning", "auto detailing"],
        updatedAt: Date.now(),
      },
      {
        slug: "headlight-restoration",
        serviceName: "Headlight Restoration",
        title: "Headlight Restoration San Antonio | Improve Visibility & Safety",
        metaDescription: "Professional headlight restoration services in San Antonio. Improve night visibility and vehicle safety. Remove oxidation and restore clarity to cloudy headlights.",
        content: `
          <h2>Professional Headlight Restoration</h2>
          <p>Restore your headlights to like-new condition with our professional restoration service. We remove oxidation, scratches, and cloudiness to improve visibility and safety.</p>
          
          <h3>Restoration Process:</h3>
          <ul>
            <li>Sand and polish clouded lenses</li>
            <li>Remove scratches and oxidation</li>
            <li>Apply UV protection coating</li>
            <li>Restore original clarity</li>
          </ul>
          
          <p>Clear headlights are essential for safe nighttime driving and improved vehicle aesthetics.</p>
        `,
        keywords: ["headlight restoration San Antonio", "headlight cleaning", "car safety", "automotive restoration"],
        updatedAt: Date.now(),
      },
      {
        slug: "engine-bay-detailing",
        serviceName: "Engine Bay Detailing",
        title: "Engine Bay Detailing San Antonio | Complete Engine Cleaning",
        metaDescription: "Professional engine bay detailing in San Antonio. Deep clean your engine compartment for improved aesthetics and easier maintenance. Professional engine cleaning services.",
        content: `
          <h2>Professional Engine Bay Detailing</h2>
          <p>Our engine bay detailing service thoroughly cleans and protects your engine compartment. We remove grease, dirt, and grime while protecting sensitive components.</p>
          
          <h3>Engine Bay Services:</h3>
          <ul>
            <li>Degreasing and cleaning</li>
            <li>Plastic component restoration</li>
            <li>Protective coating application</li>
            <li>Detailed cleaning of all surfaces</li>
          </ul>
          
          <p>A clean engine bay not only looks great but also makes maintenance easier and helps identify potential issues.</p>
        `,
        keywords: ["engine bay detailing San Antonio", "engine cleaning", "car maintenance", "automotive cleaning"],
        updatedAt: Date.now(),
      },
    ];

    // Create pillar pages
    console.log("Creating pillar pages...");
    for (const pillar of pillarPages) {
      const pillarId = await convex.mutation(api.pillarPages.createPillarPage, pillar);
      console.log(`✅ Created pillar page: ${pillar.serviceName} (${pillarId})`);
    }

    // Define cluster pages for each pillar
    const clusterPages = [
      // Auto Detailing clusters
      {
        slug: "exterior-detailing-process",
        pillarSlug: "auto-detailing",
        title: "Complete Exterior Detailing Process Guide",
        metaDescription: "Learn about our step-by-step exterior detailing process. From pre-wash to final protection, discover how we achieve perfect results.",
        content: `
          <h2>Our Exterior Detailing Process</h2>
          <p>We follow a meticulous process to ensure every vehicle receives the highest quality exterior detailing service.</p>
          
          <h3>Step 1: Pre-Wash Assessment</h3>
          <p>We begin by assessing your vehicle's condition and selecting the appropriate products and techniques.</p>
          
          <h3>Step 2: Thorough Wash</h3>
          <p>Using the two-bucket method and premium soaps, we safely remove dirt and contaminants.</p>
          
          <h3>Step 3: Clay Bar Treatment</h3>
          <p>We remove embedded contaminants that washing can't eliminate, leaving your paint smooth to the touch.</p>
          
          <h3>Step 4: Polish and Protect</h3>
          <p>We apply premium wax or sealant to protect your paint and enhance its gloss.</p>
        `,
        keywords: ["exterior detailing process", "car washing", "paint protection"],
        relatedClusterIds: [],
      },
      {
        slug: "interior-cleaning-techniques",
        pillarSlug: "auto-detailing",
        title: "Professional Interior Cleaning Techniques",
        metaDescription: "Discover the professional techniques we use to deep clean and restore your vehicle's interior. From leather to fabric, we handle all materials.",
        content: `
          <h2>Interior Cleaning Mastery</h2>
          <p>Our interior cleaning process is designed to restore every surface in your vehicle's cabin to like-new condition.</p>
          
          <h3>Vacuum and Preparation</h3>
          <p>We start with thorough vacuuming using specialized tools to reach every corner and crevice.</p>
          
          <h3>Surface-Specific Cleaning</h3>
          <p>Each material receives specialized treatment - leather gets conditioned, fabric gets shampooed, and plastics get detailed.</p>
          
          <h3>Finishing Touches</h3>
          <p>We finish with odor elimination and protective treatments to keep your interior fresh.</p>
        `,
        keywords: ["interior cleaning", "car detailing", "leather cleaning"],
        relatedClusterIds: [],
      },

      // Ceramic Coating clusters
      {
        slug: "ceramic-coating-benefits",
        pillarSlug: "ceramic-coating",
        title: "Benefits of Ceramic Coating for Your Vehicle",
        metaDescription: "Learn about the many benefits of ceramic coating: protection, gloss, easy maintenance, and long-lasting results for your vehicle.",
        content: `
          <h2>Why Choose Ceramic Coating?</h2>
          <p>Ceramic coating offers unparalleled protection and beauty enhancement for your vehicle's paint.</p>
          
          <h3>Superior Protection</h3>
          <p>Creates a hard, protective layer that resists scratches, chemical etching, and UV damage.</p>
          
          <h3>Incredible Gloss</h3>
          <p>Enhances your paint's depth and shine, giving your vehicle a showroom appearance.</p>
          
          <h3>Easy Maintenance</h3>
          <p>Makes washing easier and reduces the frequency needed, saving you time and effort.</p>
        `,
        keywords: ["ceramic coating benefits", "paint protection", "car coating"],
        relatedClusterIds: [],
      },
      {
        slug: "coating-application-process",
        pillarSlug: "ceramic-coating",
        title: "Ceramic Coating Application Process",
        metaDescription: "See how our professional ceramic coating application process works. From preparation to curing, we ensure perfect results every time.",
        content: `
          <h2>Professional Coating Application</h2>
          <p>Our ceramic coating process requires careful preparation and expert application for optimal results.</p>
          
          <h3>Paint Preparation</h3>
          <p>We start with thorough washing, decontamination, and paint correction if needed.</p>
          
          <h3>Application Process</h3>
          <p>Using specialized techniques, we apply the coating in a controlled environment.</p>
          
          <h3>Curing and Protection</h3>
          <p>The coating cures to form a hard, protective layer that will protect your paint for years.</p>
        `,
        keywords: ["ceramic coating process", "paint protection", "coating application"],
        relatedClusterIds: [],
      },

      // Paint Correction clusters
      {
        slug: "scratch-removal-techniques",
        pillarSlug: "paint-correction",
        title: "Professional Scratch Removal Techniques",
        metaDescription: "Learn about the professional techniques we use to remove scratches from your vehicle's paint. Restore your car's appearance.",
        content: `
          <h2>Expert Scratch Removal</h2>
          <p>Our paint correction specialists use proven techniques to safely remove scratches and restore your paint's finish.</p>
          
          <h3>Scratch Assessment</h3>
          <p>We evaluate each scratch to determine the best removal method and products to use.</p>
          
          <h3>Precision Correction</h3>
          <p>Using professional machine polishing, we carefully remove scratches without damaging surrounding paint.</p>
          
          <h3>Protection Application</h3>
          <p>After correction, we apply protection to prevent future scratches and maintain the finish.</p>
        `,
        keywords: ["scratch removal", "paint correction", "auto body repair"],
        relatedClusterIds: [],
      },

      // Add more cluster pages for other pillars...
    ];

    // Create cluster pages
    console.log("Creating cluster pages...");
    for (const cluster of clusterPages) {
      const clusterId = await convex.mutation(api.clusterPages.createClusterPage, cluster);
      console.log(`✅ Created cluster page: ${cluster.title} (${clusterId})`);
    }

    // Add some sample reviews
    console.log("Adding sample reviews...");
    const sampleReviews = [
      {
        serviceSlug: "auto-detailing",
        customerName: "Mike Rodriguez",
        rating: 5,
        comment: "Absolutely fantastic service! My car looks better than when I first bought it. The team at One Detail At A Time is professional and thorough.",
        isVerified: true,
      },
      {
        serviceSlug: "ceramic-coating",
        customerName: "Sarah Johnson",
        rating: 5,
        comment: "The ceramic coating looks incredible and has made maintenance so much easier. Worth every penny!",
        isVerified: true,
      },
      {
        serviceSlug: "paint-correction",
        customerName: "David Chen",
        rating: 5,
        comment: "They removed years of scratches and swirl marks. My car looks brand new again. Highly recommended!",
        isVerified: true,
      },
    ];

    for (const review of sampleReviews) {
      const reviewId = await convex.mutation(api.reviews.createReview, review);
      console.log(`✅ Added review from: ${review.customerName} (${reviewId})`);
    }

    console.log("🎉 Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    process.exit(1);
  }
}

main();
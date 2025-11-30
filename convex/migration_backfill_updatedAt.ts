import { mutation } from "./_generated/server";

/**
 * Migration Script: Backfill updatedAt timestamps
 * 
 * This migration ensures all existing records have proper updatedAt timestamps.
 * It should be run BEFORE making the schema changes to updatedAt fields required.
 * 
 * Usage: Run this mutation once, then delete this file.
 */

export const backfillUpdatedAtTimestamps = mutation({
  args: {},
  handler: async (ctx) => {
    const results = {
      services: { total: 0, updated: 0, errors: 0 },
      pillarPages: { total: 0, updated: 0, errors: 0 },
      clusterPages: { total: 0, updated: 0, errors: 0 }
    };

    try {
      // Migrate services table
      console.log("🔄 Starting services table migration...");
      const services = await ctx.db.query("services").collect();
      results.services.total = services.length;
      
      for (const service of services) {
        try {
          if (!service.updatedAt || service.updatedAt === 0) {
            await ctx.db.patch(service._id, {
              updatedAt: service.createdAt || Date.now()
            });
            results.services.updated++;
          }
        } catch (error) {
          console.error(`❌ Error updating service ${service._id}:`, error);
          results.services.errors++;
        }
      }

      // Migrate pillarPages table  
      console.log("🔄 Starting pillarPages table migration...");
      const pillarPages = await ctx.db.query("pillarPages").collect();
      results.pillarPages.total = pillarPages.length;
      
      for (const pillar of pillarPages) {
        try {
          if (!pillar.updatedAt || pillar.updatedAt === 0) {
            await ctx.db.patch(pillar._id, {
              updatedAt: pillar.createdAt || Date.now()
            });
            results.pillarPages.updated++;
          }
        } catch (error) {
          console.error(`❌ Error updating pillar ${pillar._id}:`, error);
          results.pillarPages.errors++;
        }
      }

      // Migrate clusterPages table
      console.log("🔄 Starting clusterPages table migration...");
      const clusterPages = await ctx.db.query("clusterPages").collect();
      results.clusterPages.total = clusterPages.length;
      
      for (const cluster of clusterPages) {
        try {
          if (!cluster.updatedAt || cluster.updatedAt === 0) {
            await ctx.db.patch(cluster._id, {
              updatedAt: cluster.createdAt || Date.now()
            });
            results.clusterPages.updated++;
          }
        } catch (error) {
          console.error(`❌ Error updating cluster ${cluster._id}:`, error);
          results.clusterPages.errors++;
        }
      }

      console.log("✅ Migration completed:", results);
      return {
        success: true,
        message: "UpdatedAt timestamps migration completed successfully",
        results
      };

    } catch (error) {
      console.error("❌ Migration failed:", error);
      return {
        success: false,
        message: "Migration failed",
        error: error instanceof Error ? error.message : String(error),
        results
      };
    }
  },
});
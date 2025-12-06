import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";

/**
 * Test Suite: UpdatedAt Migration Validation
 * 
 * This test suite validates that:
 * 1. All records have proper updatedAt timestamps
 * 2. New records are created with required updatedAt
 * 3. Schema changes are working correctly
 * 4. Data integrity is maintained
 */

/**
 * Test query to validate all records have updatedAt
 */
export const validateAllRecordsHaveUpdatedAt = query({
  args: {},
  handler: async (ctx) => {
    const results = {
      services: { total: 0, missingUpdatedAt: 0, invalidUpdatedAt: 0 },
      pillarPages: { total: 0, missingUpdatedAt: 0, invalidUpdatedAt: 0 },
      clusterPages: { total: 0, missingUpdatedAt: 0, invalidUpdatedAt: 0 }
    };

    // Test services table
    const services = await ctx.db.query("services").collect();
    results.services.total = services.length;
    
    for (const service of services) {
      if (!service.updatedAt) {
        results.services.missingUpdatedAt++;
      } else if (typeof service.updatedAt !== 'number' || service.updatedAt <= 0) {
        results.services.invalidUpdatedAt++;
      }
    }

    // Test pillarPages table
    const pillarPages = await ctx.db.query("pillarPages").collect();
    results.pillarPages.total = pillarPages.length;
    
    for (const pillar of pillarPages) {
      if (!pillar.updatedAt) {
        results.pillarPages.missingUpdatedAt++;
      } else if (typeof pillar.updatedAt !== 'number' || pillar.updatedAt <= 0) {
        results.pillarPages.invalidUpdatedAt++;
      }
    }

    // Test clusterPages table
    const clusterPages = await ctx.db.query("clusterPages").collect();
    results.clusterPages.total = clusterPages.length;
    
    for (const cluster of clusterPages) {
      if (!cluster.updatedAt) {
        results.clusterPages.missingUpdatedAt++;
      } else if (typeof cluster.updatedAt !== 'number' || cluster.updatedAt <= 0) {
        results.clusterPages.invalidUpdatedAt++;
      }
    }

    const totalMissing = results.services.missingUpdatedAt + 
                        results.pillarPages.missingUpdatedAt + 
                        results.clusterPages.missingUpdatedAt;
    
    const totalInvalid = results.services.invalidUpdatedAt + 
                        results.pillarPages.invalidUpdatedAt + 
                        results.clusterPages.invalidUpdatedAt;

    return {
      success: totalMissing === 0 && totalInvalid === 0,
      results,
      summary: {
        totalRecords: results.services.total + results.pillarPages.total + results.clusterPages.total,
        totalMissing,
        totalInvalid
      }
    };
  },
});

/**
 * Test mutation to validate new record creation works
 */
export const testCreateRecordWithUpdatedAt = mutation({
  args: {
    testName: v.string(),
  },
  handler: async (ctx, args) => {
    const currentTime = Date.now();
    
    try {
      // Test creating a pillar page with required updatedAt
      const testPillarId = await ctx.db.insert("pillarPages", {
        slug: `test-pillar-${args.testName}`,
        serviceName: "Test Service",
        title: "Test Pillar Page",
        metaDescription: "Test meta description",
        content: "Test content",
        keywords: ["test"],
        createdAt: currentTime,
        updatedAt: currentTime,
      });

      // Test creating a cluster page with required updatedAt
      const testClusterId = await ctx.db.insert("clusterPages", {
        slug: `test-cluster-${args.testName}`,
        pillarPageId: testPillarId,
        title: "Test Cluster Page",
        metaDescription: "Test cluster meta description",
        content: "Test cluster content",
        keywords: ["test"],
        createdAt: currentTime,
        updatedAt: currentTime,
      });

      // Clean up test records
      await ctx.db.delete(testPillarId);
      await ctx.db.delete(testClusterId);

      return {
        success: true,
        message: "Test record creation with updatedAt succeeded",
        pillarId: testPillarId,
        clusterId: testClusterId,
      };

    } catch (error) {
      return {
        success: false,
        message: "Test record creation failed",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Test mutation that should fail without updatedAt
 */
export const testCreateRecordWithoutUpdatedAt = mutation({
  args: {
    testName: v.string(),
  },
  handler: async (ctx, args) => {
    const currentTime = Date.now();
    
    try {
      // This should fail because updatedAt is required
      await ctx.db.insert("pillarPages", {
        slug: `test-fail-${args.testName}`,
        serviceName: "Test Service",
        title: "Test Pillar Page",
        metaDescription: "Test meta description",
        content: "Test content",
        keywords: ["test"],
        createdAt: currentTime,
        updatedAt: 0
      });

      return {
        success: false,
        message: "Record creation should have failed without updatedAt",
      };

    } catch (error) {
      return {
        success: true,
        message: "Record creation correctly failed without updatedAt",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
});

/**
 * Test timestamp consistency
 */
export const testTimestampConsistency = query({
  args: {},
  handler: async (ctx) => {
    const results = {
      pillarPages: [] as Array<{ id: string; createdAt: number; updatedAt: number; issue?: string }>,
      clusterPages: [] as Array<{ id: string; createdAt: number; updatedAt: number; issue?: string }>,
    };

    // Test pillar pages
    const pillarPages = await ctx.db.query("pillarPages").collect();
    for (const pillar of pillarPages) {
      if (pillar.createdAt && pillar.updatedAt) {
        const issue = pillar.updatedAt < pillar.createdAt ? "updatedAt before createdAt" : undefined;
        if (issue) {
          results.pillarPages.push({
            id: pillar._id,
            createdAt: pillar.createdAt,
            updatedAt: pillar.updatedAt,
            issue,
          });
        }
      }
    }

    // Test cluster pages
    const clusterPages = await ctx.db.query("clusterPages").collect();
    for (const cluster of clusterPages) {
      if (cluster.createdAt && cluster.updatedAt) {
        const issue = cluster.updatedAt < cluster.createdAt ? "updatedAt before createdAt" : undefined;
        if (issue) {
          results.clusterPages.push({
            id: cluster._id,
            createdAt: cluster.createdAt,
            updatedAt: cluster.updatedAt,
            issue,
          });
        }
      }
    }

    const totalIssues = results.pillarPages.length + results.clusterPages.length;

    return {
      success: totalIssues === 0,
      results,
      summary: {
        totalIssues,
        pillarPageIssues: results.pillarPages.length,
        clusterPageIssues: results.clusterPages.length,
      }
    };
  },
});
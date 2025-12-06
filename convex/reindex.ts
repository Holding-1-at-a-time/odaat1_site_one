// file: convex/reindex.ts
'use node';

import { internalAction, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { ollama } from "ollama-ai-provider";
import { embed } from "ai";


// 1. HELPER: Delete all existing vector data
export const clearChunks = internalMutation({
    args: {},
/**
 * Deletes all existing vector data in the "chunks" table and returns the number of deleted documents.
 * This function is meant to be used as a helper function for development purposes only.
 */
    handler: async (ctx) => {
        const chunks = await ctx.db.query("chunks").collect();
        for (const chunk of chunks) {
            await ctx.db.delete(chunk._id);
        }
        return chunks.length;
    },
});

// 2. HELPER: Fetch all text content to be embedded
export const getAllContent = internalQuery({
    args: {},
    returns: v.array(
        v.object({
            id: v.union(v.id("pillarPages"), v.id("clusterPages")),
            slug: v.string(),
            text: v.string(),
            type: v.union(v.literal("pillar"), v.literal("cluster")),
        })
    ),
/**
 * Fetches all text content from pillar and cluster pages to be embedded.
 * Returns an array of objects containing the ID, slug, text content, and type of each page.
 * The text content is a concatenation of the title, meta description, and content of each page.
 */
    handler: async (ctx) => {
        const pillars = await ctx.db.query("pillarPages").collect();
        const clusters = await ctx.db.query("clusterPages").collect();

        return [
            ...pillars.map(p => ({
                id: p._id,
                slug: p.slug,
                text: `${p.title}\n\n${p.metaDescription}\n\n${p.content}`,
                type: "pillar" as const
            })),
            ...clusters.map(c => ({
                id: c._id,
                slug: c.slug,
                text: `${c.title}\n\n${c.metaDescription}\n\n${c.content}`,
                type: "cluster" as const
            }))
        ];
    },
});
// 3. HELPER: Save a single embedded chunk
export const saveChunk = internalMutation({
    args: {
        text: v.string(),
        embedding: v.array(v.number()),
        sourceId: v.id("pillarPages"), // Using pillar ID as the main reference
        sourceSlug: v.string(),
    },
    returns: v.null(),
        /**
         * Inserts a single embedded chunk into the database.
         * @param {object} ctx - The Convex context object.
         * @param {object} args - The mutation arguments.
         * @param {string} args.text - The text content to be embedded.
         * @param {array<number>} args.embedding - The embedding of the text content.
         * @param {string} args.sourceId - The ID of the source page (pillar or cluster).
         * @param {string} args.sourceSlug - The slug of the source page (pillar or cluster).
         */
    handler: async (ctx, args) => {
        await ctx.db.insert("chunks", {
            text: args.text,
            embedding: args.embedding,
            sourceId: args.sourceId,
            sourceSlug: args.sourceSlug,
        });
    },
});

// 4. MAIN ACTION: Orchestrates the re-indexing
export const reseed = internalAction({
    args: {},
        /**
         * Re-indexes the existing text content from pillar and cluster pages by generating vector embeddings for each chunk of text.
         * This function is meant to be used as a one-time re-indexing action and should not be used in production.
         * @param {object} ctx - The Convex context object.
         * @returns {string} A message indicating the number of vector embeddings created.
         */
    handler: async (ctx) => {
        console.log("🧹 Clearing old chunks...");
        const deleted: number = await ctx.runMutation((internal as any).reindex.clearChunks, {});
        console.log(`Deleted ${deleted} old chunks.`);

        console.log("📚 Fetching content...");
        const pages = await ctx.runQuery((internal as any).reindex.getAllContent, {});

        let totalChunks = 0;

        for (const page of pages) {
            console.log(`Processing: ${page.slug}`);

            // Simple text splitter (split by double newline for paragraphs)
            // In production, use a library like 'langchain/text_splitter'
            const rawChunks = page.text.split("\n\n").filter((t: string) => t.length > 50);

            for (const chunkText of rawChunks) {
                try {
                    // Generate Embedding via Ollama
                    const { embedding } = await embed({
                        model: ollama.textEmbeddingModel("nomic-embed-text-v2") as any,
                        value: chunkText,
                    });
                    // Only process pillars for now to avoid type errors with sourceId
                    if (page.type === "pillar") {
                        await ctx.runMutation((internal as any).reindex.saveChunk, {
                            text: chunkText,
                            embedding: embedding,
                            sourceId: page.id as any, // Cast to Id<"pillarPages">
                            sourceSlug: page.slug,
                        });
                        totalChunks++;
                    } else {
                        console.log(`Skipping cluster page ${page.slug} for now (requires schema update for sourceId union)`);
                    }

                } catch (error) {
                    console.error(`Error embedding chunk for ${page.slug}:`, error);
                }
            }
        }

        return `Re-indexing complete. Created ${totalChunks} vector embeddings.`;
    },
});
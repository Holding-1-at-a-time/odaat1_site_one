// file: convex/rag.ts
import { action, query } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { ollama } from "ollama-ai-provider"; // Updated Provider
import { embed } from "ai";

export const searchContent = action({
    args: { query: v.string() },
    handler: async (ctx, { query }) => {
        // 1. Generate embedding using Ollama
        // We use 'nomic-embed-text' as it is the standard embedding model for Ollama
        const { embedding } = await embed({
            model: ollama.textEmbeddingModel("nomic-embed-text"),
            value: query,
        });

        // 2. Search the 'chunks' vector index
        const results = await ctx.runQuery(api.rag.performVectorSearch, { embedding });

        // 3. Format context
        return results.map(r => r.text).join("\n\n");
    },
});

export const performVectorSearch = query({
    args: { embedding: v.array(v.number()) },
    handler: async (ctx, { embedding }) => {
        return await ctx.db
            .query("chunks")
            .withVectorIndex("by_embedding", (q) => q.vector("embedding", embedding))
            .take(5);
    },
});
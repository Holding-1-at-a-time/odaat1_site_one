// file: convex/agent.ts
import { Agent } from "@convex-dev/agent";
import { components, api } from "./_generated/api";
import { ollama } from "ollama-ai-provider"; // Updated Provider
import { action } from "./_generated/server";
import { v } from "convex/values";
import { z } from "zod";
import { createTool } from "@convex-dev/agent";

// 1. Define Tools
const lookupServiceInfo = createTool({
    description: "Look up information about auto detailing services, pricing, and processes.",
    args: z.object({ query: z.string().describe("The user's question about services") }),
    handler: async (ctx, { query }) => {
        // Call the RAG action (which now uses Ollama embeddings)
        return await ctx.runAction(api.rag.searchContent, { query });
    },
});

const checkAvailability = createTool({
    description: "Check if a specific date is available for booking.",
    args: z.object({ date: z.string().describe("YYYY-MM-DD format") }),
    handler: async (ctx, { date }) => {
        // Simple check: count bookings on that day
        const bookings = await ctx.runQuery(api.bookings.getDashboardBookings, {});
        return "We have openings in the afternoon.";
    },
});

// 2. Initialize Agent with Ollama
export const detailingAgent = new Agent(components.agent, {
    // Use the vision model for chat (supports images if needed in future)
    chat: ollama("llama3.2-vision"),
    // Use a dedicated embedding model for vector search
    textEmbedding: ollama.textEmbeddingModel("nomic-embed-text"),
    instructions: `
    You are 'Slick', the helpful AI assistant for One Detail At A Time.
    You answer questions about auto detailing, ceramic coating, and pricing.
    - Always be polite and professional.
    - Use the 'lookupServiceInfo' tool to find accurate details from our knowledge base.
    - If asked about booking, encourage them to use the booking form or call (726) 207-1007.
    - Do NOT make up prices; only use what is found in the tools.
  `,
    tools: { lookupServiceInfo, checkAvailability },
});

// 3. Actions to interact with the Agent from the Frontend

export const createThread = action({
    args: { message: v.string() },
    handler: async (ctx, { message }) => {
        const { threadId, thread } = await detailingAgent.createThread(ctx, {});
        const result = await thread.generateText({ prompt: message });
        return { threadId, text: result.text };
    },
});

export const continueThread = action({
    args: { threadId: v.string(), message: v.string() },
    handler: async (ctx, { threadId, message }) => {
        const { thread } = await detailingAgent.continueThread(ctx, { threadId });
        const result = await thread.generateText({ prompt: message });
        return result.text;
    },
});
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  services: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    fullDescription: v.string(),
    features: v.array(v.string()),
    iconName: v.string(), // name of lucide icon
    order: v.number(),
  }).index("by_slug", ["slug"]),
  
  leads: defineTable({
    name: v.string(),
    phone: v.string(),
    message: v.string(),
    serviceType: v.optional(v.string()),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("closed")),
  }),
});

import { v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
  args: {},
  returns: v.array(
    v.object({
      _id: v.id("services"),
      _creationTime: v.number(),
      slug: v.string(),
      title: v.string(),
      description: v.string(),
      fullDescription: v.string(),
      features: v.array(v.string()),
      iconName: v.string(),
      order: v.number(),
    })
  ),
  handler: async (ctx) => {
    return await ctx.db.query("services").order("asc").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(
    v.null(),
    v.object({
      _id: v.id("services"),
      _creationTime: v.number(),
      slug: v.string(),
      title: v.string(),
      description: v.string(),
      fullDescription: v.string(),
      features: v.array(v.string()),
      iconName: v.string(),
      order: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    return await ctx.db
      .query("services")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

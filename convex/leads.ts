import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    phone: v.string(),
    message: v.string(),
    serviceType: v.optional(v.string()),
  },
  returns: v.id("leads"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("leads", {
      ...args,
      status: "new",
    });
  },
});

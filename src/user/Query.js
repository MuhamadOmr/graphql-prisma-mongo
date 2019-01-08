const { meQuerySchema } = require("./validation");
const { extractJWTFromAuthHeader } = require("../helpers/auth/user");

const Query = {
  async me(parent, args, ctx) {
    const token = extractJWTFromAuthHeader(ctx.request);
    const user = await ctx.db.query.user({
      where: { id: ctx.request.userId }
    });
    console.log("user", user, "token", token);
    return {
      ...user,
      token
    };
  },
  async users(parent, args, ctx, info) {
    // // 1. Check if they are logged in
    // if (!ctx.request.userId) {
    //   throw new Error('You must be logged in!');
    // }
    // console.log(ctx.request.userId);
    // 2. Check if the user has the permissions to query all the users
    console.log(ctx.request);
    const validatedMeQuery = meQuerySchema.validate(args);
    if (validatedMeQuery.error) return validatedMeQuery.error;

    // 2. if they do, query all the users!
    return ctx.db.query.user(
      {
        data: {
          ...validatedMeQuery.value
        }
      },
      info
    );
  }
};

module.exports = Query;

const { signInSchema, signUpSchema } = require("./validation");
const {
  generateUserTokenById,
  matchesPassword,
  hashPassword
} = require("../helpers/auth/user");

const Mutations = {
  signup: async (parent, args, ctx, info) => {
    const validatedUserInput = signUpSchema.validate(args);
    if (validatedUserInput.error) return validatedUserInput.error;

    // hash their password
    const hashedPassword = await hashPassword(
      validatedUserInput.value.password
    );
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...validatedUserInput.value,
          password: hashedPassword
        }
      },
      info
    );

    const token = generateUserTokenById(user.id);

    return {
      ...user,
      token
    };
  },
  signin: async (parent, args, ctx) => {
    const validatedUserInput = signInSchema.validate(args);
    if (validatedUserInput.error) return validatedUserInput.error;

    const user = await ctx.db.query.user({ where: { email: args.email } });

    if (!user || !(await matchesPassword(args.password, user.password))) {
      throw new Error("incorrect email or password");
    }
    const token = generateUserTokenById(user.id);

    return {
      ...user,
      token
    };
  }
};

module.exports = Mutations;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async signup(parent, args, ctx, info) {
    // lowercase their email
    const email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser({
        data: {
          ...args,
          email,
          password,
          permissions: {
            set: ['USER']
          },
        },
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({
      userId: user.id
    }, process.env.APP_SECRET);

    // Finalllllly we return the user to the browser
    return {
      user,
      token
    };
  },
};

module.exports = Mutations;
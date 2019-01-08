const jwt = require("jsonwebtoken");
const { extractJWTFromAuthHeader } = require("../helpers/auth/user");

const authenticated = async (resolve, root, args, context, info) => {
  const contextWithUser = context;

  const token = extractJWTFromAuthHeader(contextWithUser.request);

  if (token) {
    const result = jwt.verify(token, process.env.APP_SECRET);
    contextWithUser.request.userId = result.userId;
  }

  const resolveResult = await resolve(root, args, contextWithUser, info);
  return resolveResult;
};

module.exports = authenticated;

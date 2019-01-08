const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authHdr = require("./authHeader");

const AUTH_HEADER = "authorization";
const BEARER_AUTH_SCHEME = "bearer";

const AuthHelpers = () => {
  /**
   * generate user token from the user id
   *
   * @param {String} userId
   */
  const generateUserTokenById = userId =>
    jwt.sign(
      {
        userId
      },
      process.env.APP_SECRET,
      {
        expiresIn: "1d"
      }
    );

  /**
   *
   *
   * @param {Object} request
   * @returns {String}
   */
  const extractJWTFromAuthHeader = request => {
    let token = null;
    const authSchemeLower = BEARER_AUTH_SCHEME.toLowerCase();

    if (request.headers[AUTH_HEADER]) {
      const authParams = authHdr.parse(request.headers[AUTH_HEADER]);
      if (authParams && authSchemeLower === authParams.scheme.toLowerCase()) {
        token = authParams.value;
      }
    }
    return token;
  };

  /**
   * check if user signed in
   *
   * @param {object} request
   */
  const checkSignedIn = request => {
    if (!request.userId) {
      throw new Error("user not signed in");
    }
  };

  /**
   *check if user signed out
   *
   * @param {object} request
   */
  const checkSignedOut = request => {
    if (request.userId) {
      throw new Error("user already signed in");
    }
  };

  /**
   *
   *
   * @param {*} password - raw password
   * @param {*} hashedPass - hashed password
   * @returns {Promise} promise that resolve if matched or reject if failed
   */
  const matchesPassword = (password, hashedPass) =>
    bcrypt.compareSync(password, hashedPass);

  const hashPassword = rawPassword => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(rawPassword, salt);
  };
  return {
    generateUserTokenById,
    extractJWTFromAuthHeader,
    checkSignedIn,
    matchesPassword,
    checkSignedOut,
    hashPassword
  };
};
module.exports = AuthHelpers();

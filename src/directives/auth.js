const { SchemaDirectiveVisitor } = require("graphql-tools");
const { defaultFieldResolver } = require("graphql");
const { checkSignedIn } = require("../helpers/auth/user");

class authDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(processField) {
    const field = processField;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function authResolve(...args) {
      const [, , context] = args;
      checkSignedIn(context.request);

      const result = await resolve.apply(this, args);

      return result;
    }.bind(this);
  }
}

module.exports = authDirective;

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const name = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .required()
  .label("Name");
const password = Joi.string()
  .min(6)
  .max(18)
  .label("Password");
const timezone = Joi.string()
  .default("UTC")
  .label("Timezone");

const id = Joi.objectId()
  .required()
  .error(() => "invalid id")
  .label("Id");

const email = Joi.string()
  .email({
    minDomainAtoms: 2
  })
  .lowercase();

const signUpSchema = Joi.object().keys({
  name,
  email,
  password,
  timezone
});
const meQuerySchema = Joi.object().keys({
  id,
  email
});
const signInSchema = Joi.object().keys({
  email,
  password
});

module.exports = {
  signUpSchema,
  meQuerySchema,
  signInSchema
};

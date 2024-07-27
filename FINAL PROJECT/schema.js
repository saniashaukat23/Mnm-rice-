const Joi = require("joi");

module.exports.listingschema = Joi.object({
  listing: Joi.object({
    PID: Joi.string().required(),
    pname: Joi.string().required(),
    SID: Joi.string().required().valid("SID"),
    Price: Joi.number().required(),
    pd: Joi.string().required(),
    image: Joi.string().required(),
  }).options({ presence: "required" }), // Ensure all properties are present
});

const customerSchema = Joi.object({
  CID: Joi.string().max(6).required(),
  fname: Joi.string().max(20).required(),
  lname: Joi.string().max(20),
  email: Joi.string().email().max(50).required(),
  phoneno: Joi.string().regex(/^\d{11}$/), // Assuming phone number is 11 digits
  houseno: Joi.string().max(6).required(),
  strname: Joi.string().max(50).required(),
  townname: Joi.string().max(100).required(),
  city: Joi.string().max(50).required,
});

module.exports = customerSchema;

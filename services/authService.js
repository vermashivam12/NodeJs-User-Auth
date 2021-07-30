const userRepo = require("../repositories/UserRepository");
const { generateRandomString } = require("../helpers/slugGenerator");

exports.signUp = async (payload) => {
  let userData;
  let errors = [];

  payload.slug = await generateRandomString();

  userData = await userRepo.findOne({ email: payload.email });
  if (userData) errors.push("emailErr");

  userData = await userRepo.findOne({ contact: payload.contact });
  if (userData) errors.push("contactErr");

  if (errors.length) return errors;
  return await userRepo.create(payload);
};

/**
 *  @desc    - Method to handle signIn function for all types of users
 */
exports.signIn = async (userData) => {
  const { email } = await userData;

  let userCount = await userRepo.count({ email });
  if (!userCount) return 0;

  return await userData.getSignedJwtToken();
};

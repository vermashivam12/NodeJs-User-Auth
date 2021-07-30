const userRepo = require("../repositories/UserRepository");

/**
 *  @desc    - Get a user record
 */
exports.getUser = async (filter) => {
  let data = await userRepo.findOne(filter);
  if (!data) return 0;
  return data;
};

const UserRepo = require("../repositories/UserRepository");

/**
 * @returns String
 * @desc - Generate random string (slug) & keep checking in DB for uniqueness
 */
exports.generateRandomString = async () => {
  let code = "spak_" + Math.floor(100000 + Math.random() * 900000);
  do {
    let dbData = await UserRepo.count({ slug: code });
    if (!dbData) break;
    else code = "spec_" + Math.floor(100000 + Math.random() * 900000);
  } while (1);
  return code;
};

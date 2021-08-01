const userRepo = require("../repositories/UserRepository");

/**
 *  @desc    - Get user records
 */
exports.getUsers = async (query, perPage) => {
  let filter = {};
  const { name, contact } = query;

  if (contact) filter = { ...filter, contact: contact };
  if (name)
    filter = {
      ...filter,
      name: { $regex: ".*" + name + ".*", $options: "$i" },
    };

  const limit = query.limit ? parseInt(query.limit) : perPage;
  const page = query.page && query.page > 0 ? parseInt(query.page) : 1;

  const data = await userRepo.aggregate(filter, limit, page);
  if (!data[0].data.length) return 0;
  return { data: data[0].data, count: data[0].count[0].count };
};

/**
 *  @desc    - Get a user record
 */
exports.getUser = async (filter) => {
  let data = await userRepo.findOne(filter);
  if (!data) return 0;
  return data;
};

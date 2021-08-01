const User = require("../models/User");

/**
 *  @desc    - Find all user records.
 */
exports.find = async (filter) => await User.find(filter);

/**
 *  @desc    - Find single user record.
 */
exports.findOne = async (filter) => await User.findOne(filter);

/**
 *  @desc    - Count user record.
 */
exports.count = async (filter) => await User.countDocuments(filter);

/**
 *  @desc    - Create new user record.
 */
exports.create = async (payload) => await User.create(payload);

/**
 *  @desc    - Update a user record.
 */
exports.updateOne = async (filter, payload) =>
  await User.findOneAndUpdate(filter, payload, { new: true });

/**
 *  @desc    - Aggregate all Records.
 */
exports.aggregate = async (filter, limit, page) =>
  await User.aggregate()
    .match(filter)
    .collation({ locale: "en" })
    .project({
      name: 1,
      slug: 1,
      email: 1,
      gender: 1,
      contact: 1,
      address: 1,
      country: 1,
      createdAt: 1,
    })
    .facet({
      data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
      count: [{ $group: { _id: null, count: { $sum: 1 } } }],
    })
    .exec();

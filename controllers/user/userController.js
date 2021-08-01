const userService = require("../../services/userService");

/**
 * @method  - GET
 * @desc    - get users
 */
exports.getUsers = async (req, res) => {
  try {
    const perPage = 25;

    const users = await userService.getUsers(req.query, perPage);
    if (!users)
      return res.status(200).send({
        data: [],
        perPage: 0,
        totalCount: 0,
        currentPage: 1,
        msg: "User(s) not found.",
      });

    return res.status(200).send({
      data: users.data,
      totalCount: users.count,
      currentPage: parseInt(req.query.page) || 1,
      perPage: parseInt(req.query.limit) || perPage,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

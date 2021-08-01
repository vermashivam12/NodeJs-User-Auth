const express = require("express");
const { getUsers } = require("../../controllers/user/userController");

const route = express.Router();

route.route("/search").get(getUsers);
// Search API: http://localhost:5000/api/v1/users/search?name=shivam&contact=9087654321

module.exports = route;

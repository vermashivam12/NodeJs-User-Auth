require("colors");
require("jsonwebtoken");
const express = require("express");

require("dotenv").config({ path: "./config/.env" });
const {
  dev: { node },
} = require("./config/configuration");
const dbConnect = require("./config/database");
const routerApi = require("./routes/api");

const app = express();
dbConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routerApi);

const server = app.listen(node.port, () => {
  console.log(
    "\nServer running at " +
      `http://${node.host}:${node.port}/`.green.underline.bold +
      ` in ${node.env} mode!`
  );
});

process.on("unhandledRejection", (err, promises) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

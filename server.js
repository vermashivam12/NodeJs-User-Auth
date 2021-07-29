require("colors");
const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config({ path: "./config/.env" });

const {
  dev: { node },
} = require("./config/configuration");

const app = express();

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

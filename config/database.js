require("colors");
const mongoose = require("mongoose");

const {
  dev: { db },
} = require("./configuration");

const mongoDbURL = `mongodb+srv://${db.user}:${db.password}@${db.cluster}/${db.name}?retryWrites=true&w=majority`;

const mongoConfig = {
  autoIndex: false,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  const conn = await mongoose.connect(mongoDbURL, mongoConfig);
  console.log(
    `MongoDB connected : ` + `State ${conn.connection.readyState}\n`.green
  );
};

// mongoose.set('debug', true);

module.exports = connectDB;

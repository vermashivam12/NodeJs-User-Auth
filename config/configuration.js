const config = {
  /** Development Configuration */
  dev: {
    node: {
      port: process.env.PORT || 5000,
      host: process.env.HOST || "localhost",
      env: process.env.PRODUCT_ENV || "development",
    },
    db: {
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      cluster: process.env.DB_CLUSTER,
      password: process.env.DB_PASSWORD,
    },
  },
};

module.exports = config;

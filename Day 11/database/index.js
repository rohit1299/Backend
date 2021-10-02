const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(

  "postgres",
  "postgres",
  "12345678",
  {
    host: "localhost",
    dialect: "postgres", 
  }
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database.");
  }
})();

module.exports = sequelize;
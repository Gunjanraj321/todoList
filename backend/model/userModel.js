const sequelize = require("../utils/db");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowwNull: false,
  },
});

module.exports = User;

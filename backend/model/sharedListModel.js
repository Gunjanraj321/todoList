const sequelize = require("../utils/db");
const Sequelize = require("sequelize");

const SharedList = sequelize.define("sharedlist", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdded: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  markedDone: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = SharedList;

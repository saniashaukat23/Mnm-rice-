const { Sequelize, DataTypes } = require("sequelize");
const Customer = require("../models/customers"); // Adjust the path if necessary

const sequelize = new Sequelize("test", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const Order = sequelize.define("ORDERS", {
  OID: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    allowNull: false,
  },
  CustomerId: {
    type: DataTypes.STRING(6),
    allowNull: false,
    references: {
      model: Customer,
      key: "CID",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  odate: {
    type: DataTypes.DATE,
  },
  totalbill: {
    type: DataTypes.INTEGER,
  },
  delivered: {
    type: DataTypes.STRING(3),
    validate: {
      isIn: [["yes", "no", null]],
    },
  },
});
let isDatabaseInitialized = false;

(async () => {
  try {
    if (!isDatabaseInitialized) {
      // Check if the Products table exists
      const tableExists = await sequelize.getQueryInterface().showAllTables();
      if (!tableExists.includes("Orders")) {
        await sequelize.sync();
      }
      isDatabaseInitialized = true;
    }
  } catch (error) {
    console.error("Error checking or synchronizing database:", error);
  }
})();
module.exports = Order;

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const Customer = sequelize.define("CUSTOMERS", {
  CID: {
    type: DataTypes.STRING(6),
    primaryKey: true,
    allowNull: false,
  },
  fname: {
    type: DataTypes.STRING(20),
  },
  lname: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  phoneno: {
    type: DataTypes.CHAR(11),
    allowNull: false,
  },
  houseno: {
    type: DataTypes.CHAR(6),
    allowNull: true,
  },
  strname: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  townname: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});

let isDatabaseInitialized = false;

(async () => {
  try {
    if (!isDatabaseInitialized) {
      // Check if the Products table exists
      const tableExists = await sequelize.getQueryInterface().showAllTables();
      if (!tableExists.includes("Customer")) {
        await sequelize.sync();
      }
      isDatabaseInitialized = true;
    }
  } catch (error) {
    console.error("Error checking or synchronizing database:", error);
  }
})();

module.exports = Customer;

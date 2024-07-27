const { Sequelize, DataTypes } = require("sequelize");

// Create a new instance of Sequelize
const sequelize = new Sequelize("test", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

// Define the Listing model
const Listing = sequelize.define("Listing", {
  PID: {
    type: DataTypes.STRING(6), // Assuming PID is a string with a maximum length of 6 characters
    allowNull: false,
    primaryKey: true,
  },
  pname: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  SID: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  Price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pd: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
});

// Synchronize the model with the database to create the table
(async () => {
  try {
    await Listing.sync(); // This will create the Listings table if it doesn't exist
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

module.exports = Listing;

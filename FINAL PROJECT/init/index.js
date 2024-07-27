const sequelize = require("sequelize");
const initData = require("./data");
const initData2 = require("./customersData");
const initData3 = require("./orderData");
const initData4 = require("./productDetailData");
const mySql = require("mysql2");
const Customer = require("../models/customers.js");
const Listing = require("../models/listing.js");
const Orders = require("../models/Order.js");
async function main() {
  const connection = await mySql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "test",
    password: "1234",
  });
}
main()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
const initDB2 = async () => {
  await Customer.bulkCreate(initData2.data, { validate: true })
    .then(() => {
      console.log("data insered");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("data was initialized");
};
const initDB3 = async () => {
  await Orders.bulkCreate(initData3.data, { validate: true })
    .then(() => {
      console.log("data insered");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("data was initialized");
};
// const initDB = async () => {
//   await Listing.bulkCreate(initData.data, { validate: true })
//     .then(() => {
//       console.log("data insered");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   console.log("data was initialized");
// };

initDB2();
initDB3();

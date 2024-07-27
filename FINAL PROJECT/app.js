const express = require("express");
const app = express();
const mySql = require("mysql2");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const Sequelize = require("sequelize");
const methosOverride = require("method-override");
const listings = require("./routes/listings.js");
const customers = require("./routes/customer.js");
const Orders = require("./routes/orders.js");

const sequelize = new Sequelize("test", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
let port = 8080;
async function main() {
  const connection = await mySql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "test",
    password: "1234",
  });
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methosOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use("/listings", listings);
app.use("/customers", customers);
app.use("/orders", Orders);

main()
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.log("Server is listening to the port 8080");
});
app.get("/", (req, res) => {
  res.send("Hi im root");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong!" } = err;
  res.render("error.ejs", { message });
});

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

//allow origin (cors)
app.use(
  cors({
    origin: "*", //fixed has been blocked by CORS policy from Client Site
  })
);

app.get("/", (req, res) => {
  res.send("welcome node js.");
});

//
require("./src/route/productRoute")(app, "/api/product");
require("./src/route/categoryRoute")(app, "/api/category");
require("./src/route/employeeRoute")(app, "/api/employee");
require("./src/route/customerRoute")(app, "/api/customer");
require("./src/route/wishlistRoute")(app, "/api/wishlist");
require("./src/route/methodPaymentRoute")(app, "/api/payment-method");
require("./src/route/orderStatusRoute")(app, "/api/order-status");
require("./src/route/cartRoute")(app, "/api/cart");
require("./src/route/orderRoute")(app, "/api/order");
require("./src/route/permissionRoute")(app, "/api/permission");
require("./src/route/roleRoute")(app, "/api/role");
require("./src/route/provinceRoute")(app, "/api/province");

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

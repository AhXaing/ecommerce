const express = require("express");
const app = express();
const product = require("./src/route/productRoute");

app.get("/", (req, res) => {
  res.send("welcome node js.");
});

app.get("/test", (req, res) => {
  var id = req.query.id;
  res.json({
    data: product.product(id),
  });
});

//
require("./src/route/categoryRoute")(app);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome node js.");
});

//
require("./src/route/categoryRoute")(app);
require("./src/route/productRoute")(app);
require("./src/route/employeeRoute")(app);

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});

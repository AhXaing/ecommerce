const productController = require("../controller/productController");
const product = (app) => {
  app.get("/product", productController.getAllProduct);
  app.get("/product/:id", productController.getProductById);
  app.post("/product", productController.create);
  app.put("/product", [productController.update]);
  app.delete("/product", productController.remove);
};
module.exports = product;

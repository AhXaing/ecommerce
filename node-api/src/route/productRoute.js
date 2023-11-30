const productController = require("../controller/productController");
const product = (app) => {
  app.get("/api/product", productController.getAllProduct);
  app.get("/api/product/:id", productController.getProductById);
  app.post("/api/product", productController.create);
  app.put("/api/product", [productController.update]);
  app.delete("/api/product", productController.remove);
};
module.exports = product;

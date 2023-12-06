const productController = require("../controller/productController");
const product = (app, base_route) => {
  app.get(base_route, productController.getAllProduct);
  app.get(`${base_route}/:id`, productController.getProductById);
  app.post(base_route, productController.create);
  app.put(base_route, productController.update);
  app.delete(`${base_route}/:id`, productController.remove);
  app.post(
    `${base_route}/change-status`,
    productController.changeProductStatus
  );
};
module.exports = product;

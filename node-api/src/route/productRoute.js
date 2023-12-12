const productController = require("../controller/productController");
const { userGuard } = require("../controller/AuthController");
const product = (app, base_route) => {
  app.get(base_route, userGuard(), productController.getAllProduct);
  app.get(`${base_route}/:id`, userGuard(), productController.getProductById);
  app.post(base_route, userGuard(), productController.create);
  app.put(base_route, userGuard(), productController.update);
  app.delete(base_route, userGuard(), productController.remove);
  app.post(
    `${base_route}/change-status`,
    userGuard(),
    productController.changeProductStatus
  );
};
module.exports = product;

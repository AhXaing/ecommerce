const { userGuard } = require("../controller/AuthController");
const orderController = require("../controller/orderController");
const order = (app, base_route) => {
  app.get(base_route, userGuard, orderController.getOrder);
  app.get(`${base_route}/:id`, userGuard, orderController.getOrderById);
  app.get(`${base_route}/:id`, userGuard, orderController.getOrderByCustomer);
  app.post(base_route, userGuard, orderController.create);
  app.put(base_route, userGuard, orderController.update);
  app.delete(`${base_route}/:id`, userGuard, orderController.remove);
};

module.exports = order;

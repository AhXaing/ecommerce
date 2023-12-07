const orderController = require("../controller/orderController");
const order = (app, base_route) => {
  app.get(base_route, orderController.getOrder);
  app.get(`${base_route}/:id`, orderController.getOrderById);
  app.get(`${base_route}/:id`, orderController.getOrderByCustomer);
  app.post(base_route, orderController.create);
  app.put(base_route, orderController.update);
  app.delete(`${base_route}/:id`, orderController.remove);
};

module.exports = order;

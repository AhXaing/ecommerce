const orderStatusController = require("../controller/orderStatusController");
const order_status = (app, base_route) => {
  app.get(base_route, orderStatusController.getAllOrderStatus);
  app.post(base_route, orderStatusController.create);
  app.put(base_route, orderStatusController.update);
  app.delete(`${base_route}/:id`, orderStatusController.remove);
};

module.exports = order_status;

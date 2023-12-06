const methodPaymentController = require("../controller/methodPaymentController");

const payment_method = (app, base_route) => {
  app.get(base_route, methodPaymentController.getAllmethodPayment);
  app.post(base_route, methodPaymentController.create);
  app.put(base_route, methodPaymentController.update);
  app.delete(`${base_route}/:id`, methodPaymentController.remove);
};

module.exports = payment_method;

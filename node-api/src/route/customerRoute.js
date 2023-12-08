const { userGuard } = require("../controller/AuthController");
const customerController = require("../controller/customerController");
const customer = (app, base_route) => {
  app.get(base_route, userGuard, customerController.getCustomer);
  app.get(`${base_route}/:id`, userGuard, customerController.getCustomerById);
  app.post(base_route, userGuard("customer.create"), customerController.create);
  app.put(base_route, userGuard, customerController.update);
  app.delete(`${base_route}/:id`, userGuard, customerController.remove);

  // login
  app.post(`${base_route}/auth/login`, userGuard, customerController.login);

  //
  app.get(`${base_route}_address`, userGuard, customerController.getAddress);
  app.get(
    `${base_route}_address/:id`,
    userGuard,
    customerController.getAddressById
  );
  app.post(`${base_route}_address`, userGuard, customerController.newAddress);
  app.put(`${base_route}_address`, userGuard, customerController.updateAddress);
  app.delete(
    `${base_route}_address/:id`,
    userGuard,
    customerController.removeAddress
  );
};

module.exports = customer;

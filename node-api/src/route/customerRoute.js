const customerController = require("../controller/customerController");
const customer = (app, base_route) => {
  app.get(base_route, customerController.getCustomer);
  app.get(`${base_route}/:id`, customerController.getCustomerById);
  app.post(base_route, customerController.create);
  app.put(base_route, customerController.update);
  app.delete(`${base_route}/:id`, customerController.remove);

  //
  app.get(`${base_route}_address`, customerController.getAddress);
  app.get(`${base_route}_address/:id`, customerController.getAddressById);
  app.post(`${base_route}_address`, customerController.newAddress);
  app.put(`${base_route}_address`, customerController.updateAddress);
  app.delete(`${base_route}_address/:id`, customerController.removeAddress);
};

module.exports = customer;

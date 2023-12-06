const cartController = require("../controller/cartController");
const cart = (app, base_route) => {
  app.get(base_route, cartController.getCart);
  app.post(base_route, cartController.addCart);
  app.put(base_route, cartController.updateCart);
  app.delete(`${base_route}/:id`, cartController.removeCart);
};

module.exports = cart;

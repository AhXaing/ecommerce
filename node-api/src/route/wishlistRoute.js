const wishlisatController = require("../controller/wishlisatController");
const wishlist = (app, base_route) => {
  app.get(base_route, wishlisatController.getAllWishlist);
  app.post(base_route, wishlisatController.create);
  app.delete(`${base_route}/:id`, wishlisatController.remove);
};

module.exports = wishlist;

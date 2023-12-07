const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getCart = async (req, res) => {
  const { cus_id } = req.body;
  var sql =
    "SELECT c.cart_id,c.quantity,p.* FROM tbl_cart AS c INNER JOIN tbl_product AS p ON (c.pro_id=p.pro_id) WHERE c.cus_id=?";
  const list = await db.query(sql, [cus_id]);
  res.json({
    list: list,
  });
};
const addCart = async (req, res) => {
  const { cus_id, pro_id, quantity } = req.body;
  var message = {};
  if (isEmptyOrNull(cus_id)) {
    message.cus_id = "customer is required.";
  }
  if (isEmptyOrNull(pro_id)) {
    message.pro_id = "product is required.";
  }
  if (isEmptyOrNull(quantity)) {
    message.quantity = "quantity is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      message: message,
    });
    return false;
  }
  var sql = "INSERT INTO tbl_cart (cus_id, pro_id, quantity) VALUES (?,?,?)";
  var param = [cus_id, pro_id, quantity];
  const data = await db.query(sql, param);
  res.json({
    message: "Product is added.",
    data: data,
  });
};
const updateCart = async (req, res) => {
  const { quantity, cart_id } = req.body;
  var message = {};
  if (isEmptyOrNull(cart_id)) {
    message.cart_id = "cart id is required.";
  }
  if (isEmptyOrNull(quantity)) {
    message.quantity = "quantity is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      message: message,
    });
    return false;
  }
  var sql = "UPDATED tbl_cart SET quantity=(quantity+?)  WHERE cart_id=?";
  var param = [quantity, cart_id];
  const data = await db.query(sql, param);
  res.json({
    message: "Product is updated.",
    data: data,
  });
};
const removeCart = async (req, res) => {
  var data = await db.query("DELETE FROM tbl_cart WHERE cart_id=?", [
    req.body.cart_id,
  ]);
  res.json({
    data: data,
    message: "cart is removed.",
  });
};

module.exports = {
  getCart,
  addCart,
  updateCart,
  removeCart,
};

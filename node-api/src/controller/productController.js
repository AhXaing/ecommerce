const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");
const getAllProduct = async (req, res) => {
  const sql = "SELECT * FROMT tbl_product";
  const list = await db.query(sql);
  res.json({
    list: list,
  });
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROMT tbl_product WHERE pro_id=?";
  const list = await db.query(sql, [id]);
  res.json({
    list: list,
  });
};
const create = async (req, res) => {
  var { category_id, barcode, name, quantity, price, image, description } =
    req.body;

  var message = {};
  if (isEmptyOrNull(category_id)) {
    message.category_id = "category is required.";
  }
  if (isEmptyOrNull(barcode)) {
    message.barcode = "barcode is required.";
  }
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }
  if (isEmptyOrNull(quantity)) {
    message.quantity = "quantity is required.";
  }
  if (isEmptyOrNull(price)) {
    message.price = "price is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return false;
  }
  var sql =
    "INSERT INTO tbl_product (category_id, barcode, name, quantity, price, image, description) VALUES (?,?,?,?,?,?,?)";
  var param = [category_id, barcode, name, quantity, price, image, description];
  var data = await db.query(sql, param);
  res.json({
    list: data,
    message: "product is created.",
  });
};
const update = async (req, res) => {
  var {
    category_id,
    barcode,
    name,
    quantity,
    price,
    image,
    description,
    pro_id,
  } = req.body;

  var message = {};
  if (isEmptyOrNull(category_id)) {
    message.category_id = "category is required.";
  }
  if (isEmptyOrNull(barcode)) {
    message.barcode = "barcode is required.";
  }
  if (isEmptyOrNull(name)) {
    message.name = "name is required.";
  }
  if (isEmptyOrNull(quantity)) {
    message.quantity = "quantity is required.";
  }
  if (isEmptyOrNull(price)) {
    message.price = "price is required.";
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
    return false;
  }
  var sql =
    "UPDATE tbl_product SET category_id=?, barcode=?, name=?, quantity=?, price=?, image=?, description=? WHERE pro_id=?";
  var param = [
    category_id,
    barcode,
    name,
    quantity,
    price,
    image,
    description,
    pro_id,
  ];
  var data = await db.query(sql, param);
  res.json({
    list: data,
    message: "product is updated.",
  });
};
const remove = async (req, res) => {
  const { id } = req.body;
  const sql = "DELETE * FROMT tbl_product WHERE pro_id=?";
  const list = await db.query(sql, [id]);
  res.json({
    message: "product is deleted.",
    data: list,
  });
};

const changeProductStatus = async (req, res) => {
  const { is_active, id } = req.body;
  const sql = "UPDATE tbl_product SET is_active=?  WHERE pro_id=?";
  const list = await db.query(sql, [is_active, id]);
  res.json({
    message:
      "product is updated to" + (is_active == 0 ? "inactive" : "actived"),
    data: list,
  });
};

module.exports = {
  getAllProduct,
  getProductById,
  create,
  update,
  remove,
  changeProductStatus,
};

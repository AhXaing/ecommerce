const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getAllProduct = async (req, res) => {
  const { categoryId } = req.query;
  var select =
    "SELECT p.*, c.name category_name FROM tbl_product p " +
    " INNER JOIN tbl_category c ON (P.category_id = C.category_id) ";
  var where = "";
  if (!isEmptyOrNull(categoryId)) {
    where += " WHERE p.category_id = " + categoryId;
  }
  var oderBy = " ORDER BY p.pro_id DESC";
  var sql = select + where + oderBy;
  const sqlCategory = "SELECT * FROM tbl_category ORDER BY category_id DESC";
  const list = await db.query(sql);
  const category = await db.query(sqlCategory);
  res.json({
    list: list,
    list_category: category,
  });
};
const getProductById = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM tbl_product WHERE pro_id=?";
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
    message: "product is created.",
    list: data,
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
  const sql = "DELETE FROM tbl_product WHERE pro_id=?";
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

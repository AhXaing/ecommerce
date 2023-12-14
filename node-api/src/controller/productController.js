const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getParam = (value) => {
  if (value == "" || value == "null" || value == "undefined" || value == null) {
    return null;
  }
  return value;
};

const getAllProduct = async (req, res) => {
  try {
    const { page, fromDate, toDate, categoryId, txtSearch, productstatus } =
      req.query;
    var params = [getParam(categoryId)];
    var pageLimit = 10;
    var offset = (page - 1) * pageLimit;
    var select = "SELECT p.*, c.name category_name ";
    var join =
      " FROM tbl_product p INNER JOIN tbl_category c ON (P.category_id = C.category_id) ";
    var where = " WHERE p.category_id = IFNULL(?, p.category_id) ";

    if (!isEmptyOrNull(txtSearch)) {
      where += " AND p.barcode = ? OR p.name LIKE ? ";
      params.push(txtSearch);
      params.push("%" + txtSearch + "%");
    }

    if (!isEmptyOrNull(productstatus)) {
      where += " AND p.is_active = ? ";
      params.push(productstatus);
    }

    var oderBy = " ORDER BY p.pro_id DESC ";
    var limit = " LIMIT " + pageLimit + " OFFSET " + offset + "";
    var sql = select + join + where + oderBy + limit;
    const list = await db.query(sql, params);

    // select find total recode
    var selectTotal = "SELECT COUNT(p.pro_id) as total ";
    var sqlTotal = selectTotal + join + where;
    const totalRecode = await db.query(sqlTotal, params);

    // block query category
    const sqlCategory = "SELECT * FROM tbl_category ORDER BY category_id DESC";
    const category = await db.query(sqlCategory);
    res.json({
      totalRecode: totalRecode[0].total,
      list: list,
      list_category: category,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
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
  var {
    category_id,
    barcode,
    name,
    quantity,
    price,
    image,
    description,
    is_active,
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
    "INSERT INTO tbl_product (category_id, barcode, name, quantity, price, image, description, is_active) VALUES (?,?,?,?,?,?,?,?)";
  var param = [
    category_id,
    barcode,
    name,
    quantity,
    price,
    image,
    description,
    is_active,
  ];
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
    is_active,
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
    "UPDATE tbl_product SET category_id=?, barcode=?, name=?, quantity=?, price=?, image=?, description=?, is_active=? WHERE pro_id=?";
  var param = [
    category_id,
    barcode,
    name,
    quantity,
    price,
    image,
    description,
    is_active,
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

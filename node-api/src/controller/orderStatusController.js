const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getAllOrderStatus = async (req, res) => {
  var sql = "SELECT * FROM tbl_order_status";
  const list = await db.query(sql);
  res.json({
    list: list,
  });
};
const create = async (req, res) => {
  var { name, message, sort_order } = req.body;
  var sql =
    "INSERT INTO tbl_order_status (name,message,sort_order) VALUES (?,?,?)";
  var param = [name, message, sort_order];
  var data = await db.query(sql, param);
  res.json({
    message: "order status is added.",
    data: data,
  });
};

const update = async (req, res) => {
  var { name, message, sort_order, order_status_id } = req.body;
  var sql =
    "UPDATE tbl_order_status SET name=?,message=?,sort_order=? WHERE order_status_id =? ";
  var param = [name, message, sort_order, order_status_id];
  var data = await db.query(sql, param);
  res.json({
    message: "order status is updated.",
    data: data,
  });
};

const remove = async (req, res) => {
  var { order_status_id } = req.body;
  var sql = "DELETE FROM tbl_order_status WHERE order_status_id =?";
  var data = await db.query(sql, [order_status_id]);
  res.json({
    message: "order status is removed.",
    list: data,
  });
};

module.exports = {
  getAllOrderStatus,
  create,
  remove,
  update,
};

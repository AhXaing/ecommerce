const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getAllmethodPayment = async (req, res) => {
  var sql = "SELECT * FROM tbl_payment_methods";
  const list = await db.query(sql);
  res.json({
    list: list,
  });
};
const create = async (req, res) => {
  var { name, code } = req.body;
  var sql = "INSERT INTO tbl_payment_methods (name,code) VALUES (?,?)";
  var param = [name, code];
  var data = await db.query(sql, param);
  res.json({
    message: "payment method is added.",
    data: data,
  });
};

const update = async (req, res) => {
  var { name, code, other, payment_methods_id } = req.body;
  var sql =
    "UPDATE tbl_payment_methods SET name=?,code=? WHERE payment_methods_id  =? ";
  var param = [name, code, payment_methods_id];
  var data = await db.query(sql, param);
  res.json({
    message: "payment method is updated.",
    data: data,
  });
};

const remove = async (req, res) => {
  var { payment_methods_id } = req.body;
  var sql = "DELETE FROM tbl_payment_methods WHERE payment_methods_id  =?";
  var data = await db.query(sql, [payment_methods_id]);
  res.json({
    message: "payment method is removed.",
    list: data,
  });
};

module.exports = {
  getAllmethodPayment,
  create,
  remove,
  update,
};

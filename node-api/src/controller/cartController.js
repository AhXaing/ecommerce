const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getCart = (req, res) => {
  const { cus_id } = req.params.body;
  var sql = "SELECT * FROM tbl_cart WHERE cus_id=?";
};
const addCart = (req, res) => {};
const updateCart = (req, res) => {};
const removeCart = (req, res) => {};

module.exports = {
  getCart,
  addCart,
  updateCart,
  removeCart,
};

const db = require("../util/db");
const { isEmptyOrNull } = require("../util/validate");

const getAllWishlist = async (req, res) => {
  const { cus_id } = req.body;
  var sql = "SELECT * FROM tbl_wishlist WHERE cus_id =?";
  //   var sql = "SELECT wl.wishlist_id, p.* FROM tbl_wishlist wl";
  //   sql += "INNER JOIN tbl_product p ON (p.pro_id = wl.pro_id)";
  //   sql += "WHERE wl.cus_id=?";
  const list = await db.query(sql, [cus_id]);
  res.json({
    list: list,
  });
};
const create = async (req, res) => {
  var { cus_id, pro_id } = req.body;
  var sql = "INSERT INTO tbl_wishlist (cus_id,pro_id) VALUES (?,?)";
  var param = [cus_id, pro_id];
  var data = await db.query(sql, param);
  res.json({
    message: "product is added.",
    data: data,
  });
};
const remove = async (req, res) => {
  var { wishlist_id } = req.body;
  var sql = "DELETE FROM tbl_wishlist WHERE wishlist_id=?";
  var data = await db.query(sql, [wishlist_id]);
  res.json({
    message: "product is removed from your wishlist.",
    list: data,
  });
};

module.exports = {
  getAllWishlist,
  create,
  remove,
};

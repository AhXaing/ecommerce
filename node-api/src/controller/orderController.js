const db = require("../util/db");
const { isEmptyOrNull, invoiceNumber } = require("../util/validate");

const generateInvoiceNumber = async (req, res) => {
  const data = await db.query("SELECT MAX (order_id) as id FROM tbl_order");
  return invoiceNumber(data[0].id);
};
const getOrder = async (req, res) => {
  const list = await db.query("SELECT * FROM tbl_order");
  res.json({
    list: list,
  });
};
const getOrderById = async (req, res) => {
  const list = await db.query("SELECT * FROM tbl_order WHERE order_id=?", [
    req.params.body,
  ]);
  res.json({
    list: list,
  });
};
const getOrderByCustomer = async (req, res) => {
  const { cus_id } = req.body;
  const list = await db.query("SELECT * FROM tbl_order WHERE cus_id=?", [
    cus_id,
  ]);
  res.json({
    list: list,
  });
};

const create = async (req, res) => {
  try {
    db.beginTransaction();
    const { cus_id, cusd_id, payment_methods_id, comment } = req.body;

    var message = {};
    if (isEmptyOrNull(cus_id)) {
      message.cus_id = "customer id is required.";
    }
    if (isEmptyOrNull(cusd_id)) {
      message.cusd_id = "customer detail id is required.";
    }
    if (isEmptyOrNull(payment_methods_id)) {
      message.payment_methods_id = "payment method is required.";
    }
    if (Object.keys(message).length > 0) {
      res.json({
        message: message,
      });
      return false;
    }

    // find customer address info by customer details from client side
    var address = await db.query(
      "SELECT * FROM tbl_customer_details WHERE cusd_id=?",
      [cusd_id]
    );
    if (address?.length > 0) {
      const { firstname, lastname, phone, address_desc } = address[0];
      //find order_total from getCart by Customer
      var product = await db.query(
        "SELECT c.*,p.price FROM tbl_cart c INNER JOIN tbl_product p ON (c.pro_id = p.pro_id) WHERE c.cus_id=?",
        [cus_id]
      );
      if (product.length > 0) {
        var order_total = 0;
        product.map((item, index) => {
          order_total += item.quantity * item.price;
        });

        // insert data to tbl_order
        var inv_num = await generateInvoiceNumber();
        const order_status_id = 1;
        var sqlOrder =
          "INSERT INTO tbl_order (cus_id,order_status_id,payment_methods_id,invoice_no,order_total,firstname,lastname,phone,address_desc,comment) VALUES (?,?,?,?,?,?,?,?,?,?)";
        var sqlparam = [
          cus_id,
          order_status_id,
          payment_methods_id,
          inv_num,
          order_total,
          firstname,
          lastname,
          phone,
          address_desc,
          comment,
        ];
        const order = await db.query(sqlOrder, sqlparam);

        // insert order_details
        product.map(async (item, index) => {
          var sqlOrderDetails =
            "INSERT INTO tbl_order_detail (order_id,pro_id,quantity,price) VALUES (?,?,?,?)";
          var paramOrderDetail = [
            order.insertId,
            item.pro_id,
            item.quantity,
            item.price,
          ];
          const orderDetail = await db.query(sqlOrderDetails, paramOrderDetail);

          // cut stock
          var sqlPro =
            "UPDATE tbl_product SET quantity=(quantity-?) WHERE pro_id=?";
          var updatePro = await db.query(sqlPro, [item.quantity, item.pro_id]);
        });

        // clear cart by customer
        await db.query("DELETE FROM tbl_cart WHERE cus_id=?", [cus_id]);

        res.json({
          message: "Your order has been successfully!",
          data: order,
        });
        db.commit();
      } else {
        res.json({
          message: "Your cart is empty",
          error: true,
        });
      }
    } else {
      res.json({
        message: "Please enter your address.",
        error: true,
      });
    }
  } catch (error) {
    db.rollback();
    error: true;
    message: error;
  }
};
const update = async (req, res) => {};
const remove = async (req, res) => {};

module.exports = {
  getOrder,
  getOrderById,
  getOrderByCustomer,
  create,
  update,
  remove,
};

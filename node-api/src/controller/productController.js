const getAllProduct = (req, res) => {
  res.json({
    list: "list product.",
  });
};
const getProductById = (req, res) => {
  res.json({
    list: "list product by Id.",
  });
};
const create = (req, res) => {
  res.json({
    list: "create product.",
  });
};
const update = (req, res) => {
  res.json({
    list: "update product.",
  });
};
const remove = (req, res) => {
  res.json({
    list: "remove product.",
  });
};

module.exports = {
  getAllProduct,
  getProductById,
  create,
  update,
  remove,
};

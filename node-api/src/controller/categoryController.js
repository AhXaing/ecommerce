const getAllCategory = (req, res) => {
  res.json({
    list: "All Category.",
  });
};
const getAllCategoryById = (req, res) => {
  res.json({
    list: "All Category By Id.",
  });
};
const create = (req, res) => {
  res.json({
    list: "create category.",
  });
};
const update = (req, res) => {
  res.json({
    list: "update category.",
  });
};
const remove = (req, res) => {
  res.json({
    list: "remove category.",
  });
};

module.exports = {
  getAllCategory,
  getAllCategoryById,
  create,
  update,
  remove,
};

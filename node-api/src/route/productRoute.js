// const categoryRoute = () => {};
var data = [
  {
    id: 110,
    name: "Coca",
    stockIn: 24,
  },
  {
    id: 111,
    name: "Tiger",
    stockIn: 204,
  },
  {
    id: 112,
    name: "Acnhor",
    stockIn: 224,
  },
  {
    id: 113,
    name: "Hanuman",
    stockIn: 2024,
  },
];

const product = (params_id) => {
  var dataArr = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].id == params_id) {
      dataArr.push(data[i]);
    }
  }
  return dataArr;
};

module.exports = {
  product,
};

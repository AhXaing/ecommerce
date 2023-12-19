exports.TOKEN_KEY = "uVALmn7vlY7dZztIDLnw1Bz1Qy1iEhbD";
exports.REFRESH_KEY = "uVALmn7vlY7dZztIDLnw1Bz1Qy1iEhbD";
exports.isEmptyOrNull = (value) => {
  if (value == "" || value == null || value == "null" || value == undefined) {
    return true;
  }
  return false;
};

exports.invoiceNumber = (number) => {
  var str = "" + (number + 1);
  var pad = "000000";
  var invoice = pad.substring(0, pad.length - str.length) + str;
  return "INV" + invoice;
};

exports.productBarcode = (number) => {
  var str = "" + (number + 1);
  var pad = "000000";
  var barcode = pad.substring(0, pad.length - str.length) + str;
  return "P" + barcode;
};

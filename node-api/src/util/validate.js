exports.TOKEN_KEY = "LKJIJOPIEWRJ@#IU)(@U#)*@)#*$)LKJDSFSL:KJ12309802934908";
exports.REFRESH_KEY =
  "342080!@DCFS23;ksdfkq23po9[f323@$@#$@#$@$#@#$@#$sjdflajlkjsaf";
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

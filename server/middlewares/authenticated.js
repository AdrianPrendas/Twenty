"use strict";

var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "Niffler_Gloables_2019";

exports.ensureAuth = function(req, res, next) {
  if (!req.headers.authorization) {
    return res
    .status(403)
    .send({ message: "La peticion no tiene la cabecera" });
  }
  var token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    var payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Token expiro" });
    }
  } catch (ex) {
    console.log(ex);
    return res.status(404).send({ message: "Token no es valido" });
  }
  req.user = payload;

  next();
};

exports.getUserReq = function(req){
  if(!req.headers.authorization)
    return undefined
  var token = req.headers.authorization.replace(/['"]+/g, "");
  try {
    var payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {
      return undefined
    }
  } catch (ex) {
    console.log(ex);
    return undefined
  }

  return payload //user
}

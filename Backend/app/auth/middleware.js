const {getToken} = require('../utils/getToken')
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../users/model");
const { json } = require("express");

function decodeToken() {
  return async function (req, res, next) { //<- INI PENTING untuk mengembalikan function async
    try {
      //let token = getToken(req);
      let token = getToken(req);
      if (!token) return next();
      req.user = jwt.verify(token, config.secretKey);
      let user = await User.findOne({ token: { $in: [token] } });
      if (!user) {
        return res.json({
          error: 1,
          message: `Token expired`,
        });
      }
    } catch (err) {
      if (err && err.name === "JsonWebTokenError") {
        return res.json({
          error: 1,
          message: "error",
        });
      }
      next(err);
    }
    return next(); // <--
  };
}

//NOTE: SI err itu isinya ada dua yaitu "name": "JsonWebTokenError",
        //"message": "invalid token"

module.exports = { decodeToken };

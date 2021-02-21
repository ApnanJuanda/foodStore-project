const User = require("../users/model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config");
const { getToken } = require("../utils/getToken");

const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt -cart_items -token"
    );
    if (!user) {
      return done();
    }

    if (bcrypt.compareSync(password, user.password)) {
      ({ password, ...userWithoutPassword } = user.toJSON());
      return done(null, userWithoutPassword);
    }
  } catch (err) {
    done(err, null);
  }
  done();
};

const login = async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      return res.json({
        error: 1,
        message: "Email or Password is Incorrect",
      });
    }

    //Buat Json Web Token
    let signed = jwt.sign(user, config.secretKey); /// <--- ganti secret key dengan keymu sendiri, bebas yang sulit ditebak

    //Simpan Token tersebut ke User terkait <--INI PENTING
    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { token: signed } }, //token diisi dengan kode acak yang terpadukan dengan secretkey yang nantinya di decode dengan secretkey lagi
      { new: true }
    );

    //response ke client
    return res.json({
      message: "logged in successfully",
      user: user,
      token: signed,
    });
  })(req, res, next);
};

//arrow function =>
const register = async (req, res, next) => {
  try {
    const payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (err) {
    //Cek kemungkinan kesalahan terkait validasi
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const me = (req, res, next) => {
  if (!req.user) {
    return res.json({
      error: 1,
      message: "You are not login or Token is expired",
    });
  }
  return res.json(req.user);
};

const logout = async (req, res, next) => {
  //dapatkan token dari request
  let token = getToken(req);
 // ,{ useFindAndModify: false }
  //hapus token dari user
  let user = await User.findOneAndUpdate({token: {$in: [token]}}, {$pull: {token}},{ useFindAndModify: false });
  //cek user atau token
  if (!user || !token) {
    return res.json({
      error: 1,
      message: "No User Found",
    });
  }

  //Logout berhasil
  return res.json({
    error: 0,
    message: "Logout berhasil",
  });
};

module.exports = { register, localStrategy, login, me, logout};

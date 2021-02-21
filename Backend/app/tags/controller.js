const Tag = require("./model");
const { policyFor } = require("../policy/index");

//createTaq
const store = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Tag")) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk membuat produk`,
      });
    }
    let payload = req.body;
    let tag = new Tag(payload);
    await tag.save();
    return res.json(tag);
  } catch (err) {
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

//getAll
const index = async (req, res, next) => {
  try {
    let tags = await Tag.find();
    return res.json(tags);
  } catch (err) {
    next(err);
  }
};

//getById
const spesific = async (req, res, next) => {
  try {
    let tag = await Tag.findById(req.params.id);
    return res.json(tag);
  } catch (err) {
    next(err);
  }
};

//updateTaq
const update = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("update", "Tag")) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk membuat produk`,
      });
    }

    let payload = req.body;
    let tag = await Tag.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(tag);
  } catch (err) {
    if (err & (err.name === "ValidationError")) {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("delete", "Tag")) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk membuat produk`,
      });
    }
    let tag = await Tag.findByIdAndDelete(req.params.id);
    return res.send({
      status: "success",
      message: "Delete tag is success",
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { store, index, spesific, update, destroy };
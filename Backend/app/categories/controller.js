const Category = require("./model");
const { policyFor } = require("../policy/index");

//createCategory
const store = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("create", "Category")) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk membuat kategori`,
      });
    }
    let payload = req.body;
    let category = new Category(payload);
    await category.save();

    return res.json(category);
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

//updateCategory
const update = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("update", "Category")) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk mengupdate kategori`,
      });
    }
    let payload = req.body;
    let category = await Category.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    return res.json(category);
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
    let categories = await Category.find();
    return res.json(categories);
  } catch (err) {
    next(err);
  }
};

//getById
const spesific = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id);
    return res.json(category);
  } catch (err) {
    next(err);
  }
};

//deleteCategory
const destroy = async (req, res, next) => {
  try {
    let policy = policyFor(req.user);
    if (!policy.can("delete", "Category")) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk menghapus kategori`,
      });
    }
    let category = await Category.deleteOne({ _id: req.params.id });
    return res.send({
      status: "success",
      message: "delete category is success",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { store, update, index, spesific, destroy };

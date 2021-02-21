const DeliveryAddress = require("./model");

const { policyFor } = require("../policy/index");
const { subject } = require("@casl/ability"); //untuk keperluan proteksi update

//createAddress
const store = async (req, res, next) => {
  let policy = policyFor(req.user);

  if (!policy.can("create", "DeliveryAddress")) {
    return res.json({
      error: 1,
      message: `You are not allowed to perform this action`,
    });
  }

  try {
    let payload = req.body;
    let user = req.user;

    let address = new DeliveryAddress({
      ...payload,
      user: user._id,
    });
    await address.save();

    return res.json(address);
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

//updateAddress
const update = async (req, res, next) => {
  let policy = policyFor(req.user);
  try {
    let { id } = req.params;

    //buat payload dan keluarkan idnya
    let { _id, ...payload } = req.body;

    let address = await DeliveryAddress.findOne({
      _id: id,
    });
    let subjectAddress = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    if (!policy.can("update", subjectAddress)) {
      return res.json({
        error: 1,
        message: `You're not allowed to
        modify this resource`,
      });
    }

    //update ke database
    address = await DeliveryAddress.findOneAndUpdate(
      {
        _id: id,
      },
      payload,
      {
        new: true,
      }
    );
    return res.json(address);
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

//deleteAddress
const destroy = async (req, res, next) => {
  let policy = policyFor(req.user);

  try {
    let { id } = req.params;

    let address = await DeliveryAddress.findOne({ _id: id });
    let subjectAddress = subject("DeliveryAddress", {
      ...address,
      user_id: address.user,
    });
    if (!policy.can("delete", subjectAddress)) {
      return res.json({
        error: 1,
        message: `You're not allowed to delete this resource`,
      });
    }

    //delete from database
    await DeliveryAddress.findOneAndDelete({ _id: id });
    return res.json({
      status: "success",
      message: "Delete Address is success",
    });
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

//getAllAddress
const index = async (req, res, next) => {
  const policy = policyFor(req.user);
  if (!policy.can("view", "DeliveryAddress")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }
  try {
    let { limit = 10, skip = 0 } = req.query;

    const count = await DeliveryAddress.find({
      user: req.user._id,
    }).countDocuments();
    const deliverAddresses = await DeliveryAddress.find({ user: req.user._id })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort("-createdAt");

    return res.json({
      data: deliverAddresses,
      count: count
    })
  } catch (err) {
    if(err && err.name === 'ValidationError'){
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors
      })
    }
    next(err);
  }
};


//getById Address
const spesific = async (req, res, next) => {
  const policy = policyFor(req.user);
  if (!policy.can("view", "DeliveryAddress")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }
  try {
    let {id} = req.params

    const deliverAddresses = await DeliveryAddress.findById(id)

    return res.json(deliverAddresses)
  } catch (err) {
    if(err && err.name === 'ValidationError'){
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors
      })
    }
    next(err);
  }
};

module.exports = {
  store,
  update,
  destroy,
  index,
  spesific
};

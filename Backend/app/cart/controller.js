const { policyFor } = require("../policy/index");
const Product = require("../products/model");
const CartItem = require("../cartItem/model");

const update = async (req, res, next) => {
  let policy = policyFor(req.user);
  if (!policy.can("update", "Cart")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }
  try {
    const { items } = req.body;

    //mendapatkan id dari masing-masing product karena isi items itu adalah array of object
    const productIds = items.map((itm) => itm._id);

    //cari masing-masing product berdasarkan $in dari productIds
    const products = await Product.find({ _id: { $in: productIds } });
    let cartItems = items.map((item) => {
      let relatedProduct = products.find(
        (product) => product._id.toString() === item._id
      );
      return {
        _id: relatedProduct._id,
        product: relatedProduct._id,
        price: relatedProduct.price,
        image_url: relatedProduct.image_url,
        name: relatedProduct.name,
        user: req.user._id,
        qty: item.qty,
      };
    });

    await CartItem.deleteMany({ user: req.user._id }) //ini fungsinya untuk menghapus barang di database jika decrementnnya sampai nol

    //update/ simpan ke MongoDB semua item pada `CartItems`
    await CartItem.bulkWrite(
      cartItems.map((item) => {
        return {
          updateOne: {
            filter: { user: req.user._id, product: item.product },
            update: item,
            upsert: true,
          },
        };
      })
    );

    //Respo ke Client
    return res.json(cartItems);
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

const index = async (req, res, next) => {
  let policy = policyFor(req.user);

  if (!policy.can("read", "Cart")) {
    return res.json({
      error: 1,
      message: `You're not allowed to perform this action`,
    });
  }

  try {
    let items = await CartItem.find({ user: req.user._id }).populate("product");
    return res.json(items);
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

module.exports = { update, index };

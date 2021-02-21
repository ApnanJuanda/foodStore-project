const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    required: [true, "name harus diisi"],
  },
  price: {
    type: Number,
    required: [true, "price harus diisi"],
  },
  qty: {
    type: Number,
    required: [true, "qty harus diisi"],
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
});

module.exports = model("OrderItem", orderItemSchema);

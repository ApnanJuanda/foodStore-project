const Invoice = require("./model");
const { policyFor } = require("../policy/index");
const { subject } = require("@casl/ability");

const show = async (req, res, next) => {
  try {
    let { order_id } = req.params;

    //panggil data dari mongoDB
    let invoice = await Invoice.findOne({ order: order_id })
      .populate("order")
      .populate("user");

    //cek otorisasi
    let policy = policyFor(req.user);
    let subjectInvoice = subject("Invoice", {
      ...invoice,
      user_id: invoice.user._id,
    });
    if (!policy.can("read", subjectInvoice)) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk melihat invoice ini.`,
      });
    }
    // (1) respon ke _client_
    return res.json(invoice);
  } catch (err) {
    return res.json({
      error: 1,
      message: `Error when getting invoice`,
    });
    next(err);
  }
};

module.exports = { show };

const router = require("express").Router();
const multer = require("multer");
const CartController = require("./controller");

router.put("/carts", multer().none(), CartController.update);
router.get("/carts", CartController.index);

module.exports = router;

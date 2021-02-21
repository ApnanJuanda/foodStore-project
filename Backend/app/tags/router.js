const router = require("express").Router();
const { TooManyRequests } = require("http-errors");
const multer = require("multer");

const tagController = require("./controller");

router.post("/tags", multer().none() ,tagController.store);
router.get("/tags", tagController.index);
router.get("/tags/:id", tagController.spesific);
router.put("/tags/:id", tagController.update);
router.delete("/tags/:id", tagController.destroy);

module.exports = router;

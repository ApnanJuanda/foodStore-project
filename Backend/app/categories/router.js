const router = require("express").Router();
const multer = require("multer"); //library untuk menangani untuk form

const categoryController = require("./controller");

//Router
router.post("/categories", multer().none(), categoryController.store);
router.put("/categories/:id", multer().none(), categoryController.update);
router.get("/categories", categoryController.index);
router.get("/categories/:id", categoryController.spesific);
router.delete("/categories/:id", categoryController.destroy);


module.exports = router;

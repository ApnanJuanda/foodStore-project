const router = require("express").Router();
const multer = require("multer");

const addressController = require("./controller");

//membuat endpoint
router.post("/address", multer().none(), addressController.store); //Done
router.put("/address/:id", multer().none(), addressController.update); //Done
router.delete("/address/:id", multer().none(), addressController.destroy); //Done
router.get("/address", addressController.index); //Done
router.get("/address/:id", addressController.spesific); //Done



module.exports = router;

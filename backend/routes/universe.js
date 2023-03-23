const express = require('express');
const router = express.Router();

// Les controllers de l'appli
const universeController = require('../controllers/universe');

router.get("/", universeController.getAllUniverses);
router.get("/:id", universeController.getOneUniverse);

router.post("/", universeController.createUniverse);

router.put("/:id", universeController.modifyUniverse);

router.delete("/:id", universeController.deleteUniverse);

module.exports = router;
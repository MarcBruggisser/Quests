const express = require('express');
const router = express.Router();

// Les controllers de l'appli
const questController = require('../controllers/quests');

router.get("/", questController.getAllTasks);
router.get("/:id", questController.getOneTask);

router.post("/", questController.createTask);

router.put("/:id", questController.modifyTask);

router.delete("/:id", questController.deleteTask);

module.exports = router;
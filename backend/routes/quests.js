const express = require('express');
const router = express.Router();

// Les controllers de l'appli
const questController = require('../controllers/quests');

router.get("/", questController.getAllQuests);
router.get("/:id", questController.getOneQuest);
router.get("/subquests/:id", questController.getAllSubquests);

router.post("/", questController.createQuest);

router.put("/:id", questController.modifyQuest);

router.delete("/", questController.deleteQuest);

module.exports = router;
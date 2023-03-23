const express = require('express');
const router = express.Router();

// Les controllers de l'appli
const questController = require('../controllers/quests');

router.get("/", questController.getAllQuests);
router.get("/:id", questController.getOneQuest);

router.post("/", questController.createQuest);

router.put("/:id", questController.modifyQuest);

router.delete("/:id", questController.deleteQuest);

module.exports = router;
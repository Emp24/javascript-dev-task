const express = require("express");
const router = express.Router();
const data = require("../TestData.json");
const makeRandomList = require("../utils/makeRandomList");

router.get("/questions", async (req, res) => {
  const questionsList = await makeRandomList(data.wordList);

  res.status(200).send(questionsList);
});

module.exports = router;

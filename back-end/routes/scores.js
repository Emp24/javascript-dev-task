const express = require("express");
const router = express.Router();

const calculateRank = require("../utils/calculateRank");

router.post("/scores", async (req, res) => {
  const rank = await calculateRank(req.body.score);
  res.status(200).send({ rank: rank });
});

module.exports = router;

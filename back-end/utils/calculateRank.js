const data = require("../TestData.json");

const calculateRank = (score) => {
  const scores = data.scoresList;
  let scoresBelowGivenScore = 0;
  for (let i = 0; i < scores.length; i++) {
    if (scores[i] < score) {
      scoresBelowGivenScore += 1;
    }
  }
  const rank = (scoresBelowGivenScore / scores.length) * 100;
  return Math.round(rank * 100) / 100;
};

module.exports = calculateRank;

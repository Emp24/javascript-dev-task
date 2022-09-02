const express = require("express");

const app = express();
const questions = require("./routes/questions");
const scores = require("./routes/scores");
const port = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
//TODO (Validation)
//TODO Routes

app.use(bodyParser.json());
app.use("/school/api/", questions);
app.use("/school/api/", scores);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

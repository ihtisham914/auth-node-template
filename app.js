import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Testing route");
});

app.listen(8000, () => {
  console.log("app listening");
});

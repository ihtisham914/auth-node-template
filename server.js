import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

// here goes connection to database

app.listen(8000, () => {
  console.log("app listening");
});

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "./app.js";

app.get("/", (req, res) => {
  res.send(`Hello !`);
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Example app listening on port ${process.env.PORT || 8000}`);
});

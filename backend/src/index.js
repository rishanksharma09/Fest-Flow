import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { app } from "./app.js";
import { connectDb } from "./connectDB/connectDB.js";

app.get("/", (req, res) => {
  res.send(`Hello !`);
});

const main = async () => {
  try {
    await connectDb()
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Example app listening on port ${process.env.PORT || 8000}`);
    });

  } catch (error) {
    console.log(error)
  }
}

await main()



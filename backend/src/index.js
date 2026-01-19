import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const { app } = await import("./app.js")
import { connectDb } from "./connectDB/connectDB.js";


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



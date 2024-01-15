import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5001;

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
    });

    const server = app.listen(PORT, "127.0.0.1", () => {
      const { address, port } = server.address();

      console.log(`Server has been started on http://${address}:${port}`);
    });
  } catch (e) {
    console.log("Server startup error: ", e);
  }
}

bootstrap();

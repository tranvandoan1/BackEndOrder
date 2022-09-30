import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { readdirSync } from "fs";
require("dotenv").config();
const app = express();
// database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log("DB not connected ", error));

// middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cors());
// Route
readdirSync("./routes").map((route) =>
  app.use("/api", require(`./routes/${route}`))
);

app.use(express.json());

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("server is listening port: ", port));

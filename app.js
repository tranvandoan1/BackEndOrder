import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { readdirSync } from "fs";
import expressValidator from "express-validator";
import dotenv from "dotenv";
import bodyParser from "body-parser";
require("dotenv").config();
const app = express();
// database


//Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    createIndex: true,
  })
  .then((err) => {
    console.log("thành công!");
  })
  .catch((error) => console.log(error.message));

mongoose.connection.on("error", (err) => {
  console.log(`data connect failed, ${err.message}`);
});
dotenv.config();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(expressValidator());

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

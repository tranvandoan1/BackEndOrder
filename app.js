import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import expressValidator from "express-validator";
import cors from "cors";
import categoryRoutes from "./routes/category";
import productRoutes from "./routes/product";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import saveorderRoutes from "./routes/SaveOrder";
import Order from "./routes/Order";
import Table from "./routes/Table";

const app = express();
dotenv.config();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(expressValidator());
app.use(express.json({ limit: "10mb" }));
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

// routes
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", saveorderRoutes);
app.use("/api", Order);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", Table);

// listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Thanh cong", PORT);
});
// import express from "express";
// import mongoose from "mongoose";
// import morgan from "morgan";
// import cors from "cors";
// import { readdirSync } from "fs";
// import expressValidator from "express-validator";
// import dotenv from "dotenv";
// import bodyParser from "body-parser";
// require("dotenv").config();
// const app = express();
// // database


// //Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     createIndex: true,
//   })
//   .then((err) => {
//     console.log("thành công!");
//   })
//   .catch((error) => console.log(error.message));

// mongoose.connection.on("error", (err) => {
//   console.log(`data connect failed, ${err.message}`);
// });
// dotenv.config();
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );
// app.use(bodyParser.json());
// app.use(expressValidator());

// // middleware
// app.use(morgan("dev"));
// app.use(express.json({ limit: "10mb" }));
// app.use(cors());
// // Route
// readdirSync("./routes").map((route) =>
//   app.use("/api", require(`/${route}`))
// );

// app.use(express.json());

// const port = process.env.PORT || 8000;

// app.listen(port, () => console.log("server is listening port: ", port));

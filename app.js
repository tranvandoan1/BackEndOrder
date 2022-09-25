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
import Floors from "./routes/Floors";

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
app.use("/api", Floors);

// listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Thanh cong", PORT);
});

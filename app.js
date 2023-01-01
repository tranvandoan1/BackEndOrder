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
import socketio from "socket.io";
const app = express();
import http from "http";
const server = http.createServer(app);
const io = socketio(server);
io.on("connected", (socket) => {
  console.log("đã kết nối");
  // socket.on('check',data=>{
  //   socket.join(data)
  //   console.log('jojo')
  // })
});
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
    useUnifiedTopology: true
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

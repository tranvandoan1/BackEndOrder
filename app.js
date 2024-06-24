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
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   }
// });


// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // socket.on('send-export-chair', (data) => {
//   //   console.log('Received message:', data);
//   //   socket.emit('recevie-export-table', {
//   //     from: 1,
//   //     data: data
//   //   })
//   //   // Gửi tin nhắn đến tất cả các client khác
//   //   // socket.broadcast.emit('message', data);
//   // });

//   socket.on("sendDataClient", function (data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
//     console.log(data, 'data')
//     socket.emit("sendDataServer", { status: true });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
//     console.log('first')
//   })

//   // socket.on('disconnect', () => {
//   //   console.log('A client disconnected');
//   // });
// });

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
});


socketIo.on("connection", (socket) => {
  socket.on("sendDataClient", function (data) {
    console.log(data, '23ewrfd')
    socketIo.emit("sendDataServer-table", { data: data });
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
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


app.use(cors({
  // origin: 'https://excel-backend-uuhw.onrender.com',
  origin: "*",
  methods: ["GET", "POST"]
}))
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
// app.listen(PORT, () => {
//   console.log("Thanh cong", PORT);
// // });
server.listen(PORT, () => {
  console.log('Server đang chay tren cong 3000');
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 4000
  const message = err.message || "Server Error"

  return res.status(statusCode).send({
    status: statusCode,
    success: false,
    message
  })
})
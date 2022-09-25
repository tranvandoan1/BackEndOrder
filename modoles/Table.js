import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Table = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    user_id: {
      type: ObjectId,
      ref: "user",
    },
    timeBookTable: {
      type: String,
    },

    amount: {
      type: Number,
    },
    nameUser: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("table", Table);

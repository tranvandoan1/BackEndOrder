import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const Order = new mongoose.Schema(
  {
    seller_name: {
      type: String,
    },
    user_id: {
      type: ObjectId,
      ref: "users",
    },
    orders: {
      type: Array,
    },
    sale: {
      type: Number,
      trim: true,
    },

    sumPrice: {
      type: Number,
      trim: true,
    },
    table_id: {
      type: ObjectId,
      ref: "tables", //
    },
    bookTable: {
      type: Object,
    },
    start_time: {
      type: String,
    },
    end_time: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", Order);

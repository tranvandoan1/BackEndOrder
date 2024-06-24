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

    orders: {
      type: String,
    },
    time_start: {
      type: String,
    },
    version:{
      type: String,
    }
    // {
    //   // id_user: {
    //   //   type: ObjectId,
    //   //   ref: "users",
    //   // },
    //   id_pro: {
    //     type: ObjectId,
    //     ref: "products",
    //   },
    //   amount: {
    //     type: Number,
    //     trim: true,
    //   },
    //   name: {
    //     type: String,
    //     trim: true,
    //   },
    //   price: {
    //     type: Number,
    //     trim: true,
    //   },
    //   // id_table: {
    //   //   type: ObjectId,
    //   //   ref: "tables", //
    //   // },
    //   // floor_id: {
    //   //   type: ObjectId,
    //   //   ref: "floors", //
    //   // },
    //   photo: {
    //     type: String,
    //   },
    //   weight: {
    //     type: Number,
    //   },
    //   dvt: {
    //     type: String,
    //   },
    // },
  },
  { timestamps: true }
);
module.exports = mongoose.model("table", Table);

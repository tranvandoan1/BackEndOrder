const mongoose = require("mongoose");
const crypto = require("crypto");
const { v1: uuidv1 } = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    loginWeb: {
      type: Number,
    },
    loginApp: {
      type: Number,
    },
    hashed_password: {
      type: String,
    },
    phone: {
      type: Number,
    },
    about: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarRestaurant: {
      type: String,
    },
    nameRestaurant:{
      type:String
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 1,
    },
    history: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// vitual field

userSchema
  .virtual("password") // Tạo 1 field ảo
  .set(function (password) {
    this.salt = uuidv1(); //unique
    this.hashed_password = this.encrytPassword(password);
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encrytPassword(plainText) === this.hashed_password;
  },
  encrytPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("user", userSchema);

import User from "../modoles/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const expressJwt = require("express-jwt");

export const signup = async (req, res) => {
  const user = new User(req.body);
  const checkEmail = await User.findOne({
    email: user.email,
  });
  const checkPhone = await User.findOne({
    phone: Number(user.phone),
  });
  if (checkEmail !== null) {
    return res.status(400).json({
      error: "Email đã tồn tại !",
    });
  } else if (checkPhone !== null) {
    return res.status(400).json({
      error: "Số điện thoại đã tồn tại !",
    });
  } else {
    user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          error: "Đăng ký thất bại",
        });
      }
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json(user);
    });
  }
};

export const signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "Email của bạn không hợp lệ. Vui lòng đăng ký !",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Password của bạn không đúng",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });

    const {
      _id,
      name,
      avatar,
      email,
      role,
      phone,
      accountType,
      avatarRestaurant,
      nameRestaurant,
    } = user;
    return res.json({
      token,
      user: {
        _id,
        name,
        avatar,
        email,
        role,
        phone,
        accountType,
        avatarRestaurant,
        nameRestaurant,
      },
    });
  });
};
// export const signout = (req, res) => {
//     res.clearCookie('t');
//     res.json({
//         message: 'Đăng xuất thành công'
//     })
// }
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});
export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(process.env.JWT_SECRET);
  // if (!user) {
  //   return res.status(403).json({
  //     error: "Quyền truy cập bị Từ chối",
  //   });
  // }
  // next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denined",
    });
  }
  next();
};

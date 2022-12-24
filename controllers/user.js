import formidable from "formidable";
import _, { assign } from "lodash";
import User from "../modoles/user";
import { ObjectID } from "mongodb";

export const listUser = (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(400).json({
        err: " Không có tài khoản nào !",
      });
    }
    res.json(data);
  });
};
export const checkDataSignIn = async (req, res) => {
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
    return res.json("successfully");
  }
};
export const userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};
export const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

export const remove = async (req, res) => {
  console.log(req.body, "adsaasd");
  // let user = req.profile;
  // user.remove((err, user) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Không xóa được sản phẩm",
  //     });
  //   }
  //   User.find((err, data) => {
  //     if (err) {
  //       res.status(400).json({
  //         err: " Không có tài khoản nào !",
  //       });
  //     }
  //     res.json(data);
  //   });
  // });
  let id = req.body;
  for (let i = 0; i < id.length; i++) {
    id[i] = ObjectID(id[i]);
  }
  await User.deleteMany({ _id: { $in: id } });
  User.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sp oder";
    }
    return res.json(data);
  });
};
export const updateLogin = async (req, res) => {
  const { id } = req.body;
  await User.updateMany(
    { _id: { $in: id } },
    {
      $set: {
        count: 1,
      },
    }
  );
  User.find((err, data) => {
    if (err) {
      res.status(400).json({
        err: " Không có tài khoản nào !",
      });
    }
    return res.json(data);
  });
};
export const updateInfo = async (req, res) => {
  const { _id, avatar, phone, email, name, nameRestaurant, avatarRestaurant } =
    req.body;

  await User.updateMany(
    { _id: _id },
    {
      $set:
        name == undefined ||
        avatar == undefined ||
        phone == undefined ||
        email == undefined
          ? {
              nameRestaurant: nameRestaurant,
              avatarRestaurant: avatarRestaurant,
              count: 1,
            }
          : {
              avatar: avatar,
              phone: phone,
              email: email,
              name: name,
              count: 1,
            },
    }
  );
  User.find((err, data) => {
    if (err) {
      res.status(400).json({
        err: " Không có tài khoản nào !",
      });
    }
    res.json(data);
  });
};

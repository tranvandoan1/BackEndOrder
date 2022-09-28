import formidable from "formidable";
import _ from "lodash";
import User from "../modoles/user";

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
export const list = (req, res) => {
  User.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sản phẩm";
    }
    res.json(data);
  });
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

export const remove = (req, res) => {
  let user = req.profile;
  user.remove((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được sản phẩm",
      });
    }
    User.find((err, data) => {
      if (err) {
        res.status(400).json({
          err: " Không có tài khoản nào !",
        });
      }
      res.json(data);
    });
  });
};
export const updateLogin = async (req, res) => {
  const { id } = req.body;
  await User.updateMany(
    { _id: { $in: id } },
    {
      $set: {
        loginWeb: 1,
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
            }
          : {
              avatar: avatar,
              phone: phone,
              email: email,
              name: name,
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

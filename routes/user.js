import express from "express";
const router = express.Router();

import {
  userById,
  remove,
  read,
  updateLogin,
  listUser,
  updateInfo,
  checkDataSignIn,
} from "../controllers/user";
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
import { isAuthenticateUser } from "../middlewares/CheckAuth";

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get("/users", isAuthenticateUser, listUser);
router.get("/user/:userId", isAuthenticateUser, read);
router.post("/user-upload", isAuthenticateUser, updateInfo);
router.post("/user-upload-login", isAuthenticateUser, updateLogin);
router.post("/user-check-login", checkDataSignIn);
router.post("/userRemove", remove);

router.param("userId", isAuthenticateUser, userById);

module.exports = router;

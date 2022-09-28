import express from "express";
const router = express.Router();

import {
  userById,
  list,
  remove,
  read,
  updateLogin,
  listUser,
  updateInfo,
} from "../controllers/user";
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
import { isAuthenticateUser } from "./CheckAuth";

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.get("/users", isAuthenticateUser, listUser);
router.get("/user/:userId", isAuthenticateUser, read);
router.post("/user-upload", isAuthenticateUser, updateInfo);
router.post("/user-upload-login", isAuthenticateUser, updateLogin);
router.get("/user", isAuthenticateUser, list);
router.delete("/user/:userId", isAuthenticateUser, remove);

router.param("userId", isAuthenticateUser, userById);

module.exports = router;

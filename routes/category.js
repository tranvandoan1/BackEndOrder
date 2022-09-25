import express from "express";
import {
  create,
  list,
  update,
  categoryById,
  read,
  remove,
} from "../controllers/category";
import { isAuthenticateUser } from "./CheckAuth";
const router = express.Router();

router.post("/categoris", isAuthenticateUser, create);
router.get("/categoris", isAuthenticateUser, list);
router.get("/categoris/:categoryId", isAuthenticateUser, read);

router.put("/categoris/:categoryId", isAuthenticateUser, update);

router.delete("/categoris/:categoryId", isAuthenticateUser, remove);

router.param("categoryId", isAuthenticateUser, categoryById);

module.exports = router;

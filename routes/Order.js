import express from "express";
import { create, list, update, Id, read, remove } from "../controllers/Order";
import { isAuthenticateUser } from "./CheckAuth";
const router = express.Router();

router.post("/order", isAuthenticateUser, create);

router.get("/order", isAuthenticateUser, list);
router.get("/order/:id", isAuthenticateUser, read);

router.put("/order/:id", isAuthenticateUser, update);

router.post("/order-remove", isAuthenticateUser, remove);

router.param("id", isAuthenticateUser, Id);

module.exports = router;

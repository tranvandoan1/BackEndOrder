import express from "express";
import { create, list, update, Id, read, remove } from "../controllers/Order";
import { isAuthenticateUser } from "../middlewares/CheckAuth";
const router = express.Router();

router.post("/order", isAuthenticateUser, create);

router.get("/order", isAuthenticateUser, list);
router.get("/order/:id", isAuthenticateUser, read);

router.post("/order-remove", isAuthenticateUser, remove);

router.param("id", isAuthenticateUser, Id);

module.exports = router;

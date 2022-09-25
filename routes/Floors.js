import express from "express";
import { create, list, update, Id, read, remove } from "../controllers/Floors";
import { isAuthenticateUser } from './CheckAuth';
const router = express.Router();

router.post("/floor", isAuthenticateUser, create);
router.get("/floor", isAuthenticateUser, list);
router.get("/floor/:id", isAuthenticateUser, read);

router.put("/floor/:id", isAuthenticateUser, update);

router.delete("/floor/:id", isAuthenticateUser, remove);

router.param("id", isAuthenticateUser, Id);

module.exports = router;

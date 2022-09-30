import express from "express";
import { create, list, update, Id, read, remove } from "../controllers/Floors";
import { isAuthenticateUser } from '../middlewares/CheckAuth';
const router = express.Router();

router.post("/floor", create);
router.get("/floor", list);
router.get("/floor/:id", read);

router.put("/floor/:id", update);

router.delete("/floor/:id", remove);

router.param("id", Id);

module.exports = router;

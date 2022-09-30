import express from "express";
import { create, list, update, Id, read, remove } from "../controllers/Order";
const router = express.Router();

router.post("/order", create);

router.get("/order", list);
router.get("/order/:id", read);

router.put("/order/:id", update);

router.post("/order-remove", remove);

router.param("id", Id);

module.exports = router;

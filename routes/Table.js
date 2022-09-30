import express from "express";
import {
  create,
  list,
  update,
  Id,
  read,
  remove,
  bookTable,
  moveTable,
} from "../controllers/Table";
import { isAuthenticateUser } from "../middlewares/CheckAuth";
const router = express.Router();

router.post("/table", isAuthenticateUser, create);
router.get("/table", isAuthenticateUser, list);
router.get("/table/:id", isAuthenticateUser, read);

router.put("/table/:id", isAuthenticateUser, update);

router.post("/table/book-table", isAuthenticateUser, bookTable);
router.post("/table/move-table", isAuthenticateUser, moveTable);

router.delete("/table/:id", isAuthenticateUser, remove);

router.param("id", isAuthenticateUser, Id);

module.exports = router;

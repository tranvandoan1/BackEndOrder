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
  addOrderTable,
  removeOrderTable,
} from "../controllers/Table";
import { isAuthenticateUser } from "../middlewares/CheckAuth";
import { changeTables } from './../controllers/Table';
const router = express.Router();

router.post("/table", isAuthenticateUser, create);
router.get("/table", isAuthenticateUser, list);
router.get("/table/:id", isAuthenticateUser, read);

router.put("/table/:id", isAuthenticateUser, update);

router.post("/table/book-table", isAuthenticateUser, bookTable);
router.post("/table/move-table", isAuthenticateUser, moveTable);
router.post("/table/add-orders-table", isAuthenticateUser, addOrderTable);
router.post("/table/remove-orders-table", isAuthenticateUser, removeOrderTable);
router.post("/change-table", isAuthenticateUser, changeTables);

router.delete("/table/:id", isAuthenticateUser, remove);

router.param("id", isAuthenticateUser, Id);

module.exports = router;

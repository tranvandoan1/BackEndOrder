import express from "express";
import {
  create,
  list,
  update,
  saveorderId,
  read,
  remove,
  updateAmountWeight,
  removes,
} from "../controllers/SaveOrder";
import { changeTables } from "./../controllers/SaveOrder";
import { isAuthenticateUser } from "./CheckAuth";
const router = express.Router();

router.post("/saveorder", isAuthenticateUser, create);
router.get("/saveorder", isAuthenticateUser, list);
router.get("/saveorder/:id", isAuthenticateUser, read);

router.put("/saveorder/:id", isAuthenticateUser, update);
router.put("/saveorder-amount/:id", isAuthenticateUser, updateAmountWeight);
router.post("/change-table", isAuthenticateUser, changeTables);

router.delete("/saveorder/:id", isAuthenticateUser, remove);
router.post("/delete-order", isAuthenticateUser, removes);

router.param("id", isAuthenticateUser, saveorderId);

module.exports = router;

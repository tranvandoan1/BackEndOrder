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

const router = express.Router();

router.post("/saveorder", create);
router.get("/saveorder", list);
router.get("/saveorder/:id", read);

router.put("/saveorder/:id", update);
router.put("/saveorder-amount/:id", updateAmountWeight);
router.post("/change-table", changeTables);

router.delete("/saveorder/:id", remove);
router.post("/delete-order", removes);

router.param("id", saveorderId);

module.exports = router;

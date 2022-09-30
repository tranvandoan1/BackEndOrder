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

const router = express.Router();

router.post("/table", create);
router.get("/table", list);
router.get("/table/:id", read);

router.put("/table/:id", update);

router.post("/table/book-table", bookTable);
router.post("/table/move-table", moveTable);

router.delete("/table/:id", remove);

router.param("id", Id);

module.exports = router;

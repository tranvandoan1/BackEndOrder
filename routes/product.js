import express from "express";
import {
  create,
  list,
  update,
  productById,
  readPhoto,
  read,
  remove,
} from "../controllers/product";
import { isAuthenticateUser } from "./CheckAuth";
const router = express.Router();

router.post("/products", isAuthenticateUser, create);

router.get("/products", isAuthenticateUser, list);
router.get("/products/:productId", isAuthenticateUser, productById,read);
// router.get('/product/photo/:productId', readPhoto);

router.put("/products/:productId", isAuthenticateUser, update);

router.delete("/products/:productId", isAuthenticateUser, remove);

router.param("productId", isAuthenticateUser, productById);

module.exports = router;

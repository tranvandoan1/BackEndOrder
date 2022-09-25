import Product from "../modoles/product";
import formidable from "formidable";
import _ from "lodash";

export const create = async (req, res, next) => {
  try {
    await Product.create(req.body);
    Product.find((err, data) => {
      if (err) {
        error: "Không tìm thấy danh mục";
      }
      return res.json(data);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        error: "Không tìm thấy sản phẩm",
      });
    }
    req.product = product;
    next();
  });
};
export const read = (req, res) => {
  Product.findById(req.params.productId).exec((err, product) => {
    if (err || !product) {
      res.status(400).json({
        error: "Không tìm thấy sản phẩm",
      });
    }
    return res.json(product);
  });
};

export const remove = async (req, res) => {
  await Product.findByIdAndRemove(req.params.productId);

  Product.find((err, data) => {
    if (err) {
      error: "Không tìm thấy tầng";
    }
    return res.json(data);
  });
};

export const list = (req, res) => {
  Product.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sản phẩm";
    }
    return res.json(data);
  });
};

export const update = async (req, res) => {
  await Product.findByIdAndUpdate(req.params.productId, req.body);
  Product.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    res.json(data);
  });
};

import Category from "../modoles/category";
import _ from "lodash";
export const create = async (req, res) => {
  try {
    await Category.create(req.body);
    Category.find((err, data) => {
      if (err) {
        error: "Không tìm thấy danh mục";
      }
      return res.json(data);
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: "Không tìm thấy Danh muc",
      });
    }
    req.category = category;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.category);
};

export const remove = async (req, res) => {
  await Category.findByIdAndRemove(req.params.categoryId);
  Category.find((error, data) => {
    if (error) {
      error: "Không tìm thấy Danh muc";
    }
    return res.json(data);
  });
};

export const list = (req, res) => {
  Category.find((error, data) => {
    if (error) {
      error: "Không tìm thấy Danh muc";
    }
    return res.json(data);
  });
};

export const update = async (req, res) => {
  await Category.findByIdAndUpdate(req.params.categoryId, req.body);
  Category.find((err, data) => {
    if (err) {
      error: "Không tìm thấy danh mục";
    }
    res.json(data);
  });
};

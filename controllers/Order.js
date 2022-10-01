import Order from "../modoles/Order";
import _ from "lodash";

export const create = (req, res) => {
  let order = new Order(req.body);

  order.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Không thêm được sản phẩm",
      });
    }
    res.json(data);
  });
};

export const Id = (req, res, next, id) => {
  Order.findById(id).exec((err, order) => {
    if (err || !order) {
      res.status(400).json({
        error: "Không tìm thấy sản phẩm",
      });
    }
    req.order = order;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.order);
};

export const remove = async (req, res) => {
  const { id } = req.body;
  await Order.findByIdAndRemove(id);
  Order.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sản phẩm";
    }
    res.json(data);
  });
};

export const list = (req, res) => {
  Order.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sản phẩm";
    }
    res.json(data);
  });
};

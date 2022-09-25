import Order from "../modoles/Order";
import _ from "lodash";

export const create = (req, res) => {
  let order = new Order(req.body);
  console.log(order)
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

export const remove = (req, res) => {
  let order = req.order;
  order.remove((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được sản phẩm",
      });
    }
    Order.find((err, data) => {
      if (err) {
        error: "Không tìm thấy sản phẩm";
      }
      res.json(data);
    });
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

export const update = (req, res) => {
  const order = req.order;
  order.customer_name = req.body.customer_name;
  order.id_table = req.body.id_table;
  order.floor_id = req.body.floor_id;
  order.sum_price = req.body.sum_price;
  order.sale = req.body.sale;
  order.bill = req.body.bill;
  order.date = req.body.date;
  order.month = req.body.month;
  order.year = req.body.year;

  order.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: "Không sửa được sản phẩm",
      });
    }
    res.json(data);
  });
};
// export const readPhoto = (req, res, next) => {
//     if (req.product.photo.data) {
//         res.set('Content-Type', req.product.photo.contentType);
//         return res.send(req.product.photo.data)
//     }
//     next()

// }

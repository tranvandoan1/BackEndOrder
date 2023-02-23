import Table from "../modoles/Table";
import formidable from "formidable";
import _ from "lodash";

export const create = async (req, res) => {
  try {
    await Table.create(req.body);
    Table.find((err, data) => {
      if (err) {
        error: "Không tìm thấy tầng";
      }
      return res.json(data);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const Id = (req, res, next, id) => {
  Table.findById(id).exec((err, table) => {
    if (err || !table) {
      res.status(400).json({
        error: "Không tìm thấy ",
      });
    }
    req.table = table;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.table);
};

export const remove = async (req, res) => {
  await Table.findByIdAndRemove(req.params.id);

  Table.find((err, data) => {
    if (err) {
      error: "Không tìm thấy tầng";
    }
    return res.json(data);
  });
};

export const list = (req, res) => {
  console.log('vào nhé')
  Table.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    res.json(data);
  });
};

export const update = async (req, res) => {
  await Table.updateMany(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    }
  );
  Table.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    return res.json(data);
  });
};
export const addOrderTable = async (req, res) => {

  const orders = await Table.findOne({
    _id: req.body.id_table,
  });
  await Table.updateMany(
    { _id: req.body.id_table },
    {
      $set:
        orders.orders == null
          ? {
            orders: Array.isArray(req.body.data) == false ? JSON.stringify([req.body.data])
              : req.body.data.length <= 0 || req.body.data == null
                ? null
                : JSON.stringify(req.body.data),
            time_start: req.body.time_start,
          }
          : {
            orders: Array.isArray(req.body.data) == false ? JSON.stringify([req.body.data])
              : req.body.data.length <= 0 || req.body.data == null
                ? null
                : JSON.stringify(req.body.data),
          },
    }
  );
  Table.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    return res.json(data);
  });
};
export const bookTable = async (req, res) => {
  const { id, timeBookTable, amount, nameUser, phone } = req.body;
  await Table.updateMany(
    { _id: id },
    {
      $set: {
        amount: amount,
        timeBookTable: timeBookTable,
        nameUser: nameUser,
        phone: phone,
      },
    }
  );

  Table.find((err, data) => {
    if (err) {
      error: "Không tìm thấy bàn";
    }
    return res.json(data);
  });
};


export const removeOrderTable = async (req, res) => {
  const { id } = req.body;
  await Table.updateMany(
    { _id: id },
    {
      $set: {
        amount: "",
        timeBookTable: "null",
        nameUser: "",
        phone: null,
        orders: null,
        time_start: null
      },
    }
  );

  Table.find((err, data) => {
    if (err) {
      error: "Không tìm thấy bàn";
    }
    return res.json(data);
  });
};
export const changeTables = async (req, res) => {
  const { table_moved, table_received } = req.body;
  await Table.updateMany(
    { _id: table_moved._id },
    {
      $set: {
        amount: "",
        timeBookTable: "null",
        nameUser: "",
        phone: null,
        orders: null,
        time_start: null

      },
    }
  );
  await Table.updateMany(
    { _id: table_received },
    {
      $set: {
        amount: table_moved.amount,
        timeBookTable: String(table_moved.timeBookTable),
        nameUser: table_moved.nameUser,
        phone: table_moved.phone,
        orders: JSON.stringify(table_moved.orders),
        time_start: table_moved.time_start
      },
    }
  );
  Table.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    return res.json(data);
  });
};

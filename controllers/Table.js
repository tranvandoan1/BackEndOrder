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

export const moveTable = async (req, res) => {
  const {
    idStart,
    idEnd,
    timeBookTableStart,
    amountStart,
    nameUserStart,
    timeBookTableEnd,
    amountEnd,
    nameUserEnd,
  } = req.body;
  console.log(
    idStart,
    idEnd,
    timeBookTableStart,
    amountStart,
    nameUserStart,
    timeBookTableEnd,
    amountEnd,
    nameUserEnd
  );
  await Table.updateMany(
    { _id: idEnd },
    {
      $set: {
        amount: amountEnd,
        timeBookTable: timeBookTableEnd,
        nameUser: nameUserEnd,
      },
    }
  );
  await Table.updateMany(
    { _id: idStart },
    {
      $set: {
        amount: amountStart,
        timeBookTable: timeBookTableStart,
        nameUser: nameUserStart,
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

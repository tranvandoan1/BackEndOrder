import Saveorder from "../modoles/SaveOrder";
import _ from "lodash";
import { ObjectID } from "mongodb";
export const create = async (req, res) => {
  try {
    await Saveorder.create(req.body);
    Saveorder.find((err, data) => {
      if (err) {
        error: "Không tìm thấy tầng";
      }
      return res.json(data);
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const saveorderId = (req, res, next, id) => {
  Saveorder.findById(id).exec((err, saveorder) => {
    if (err || !saveorder) {
      res.status(400).json({
        error: "Không tìm thấy sp oder",
      });
    }
    req.saveorder = saveorder;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.saveorder);
};

export const remove = async (req, res) => {
  let saveorder = req.saveorder;
  saveorder.remove((err, saveorder) => {
    if (err) {
      return res.status(400).json({
        error: "Không xóa được sp oder",
      });
    }
    Saveorder.find((err, data) => {
      if (err) {
        error: "Không tìm thấy sp oder";
      }
      return res.json(data);
    });
  });
};

export const removes = async (req, res) => {
  let id = req.body;
  for (let i = 0; i < id.length; i++) {
    id[i] = ObjectID(id[i]);
  }
  await Saveorder.deleteMany({ _id: { $in: id } });
  Saveorder.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sp oder";
    }
    return res.json(data);
  });
};
export const list = (req, res) => {
  Saveorder.find((err, data) => {
    if (err) {
      error: "Không tìm thấy sp oder";
    }
    res.json(data);
  });
};

export const update = async (req, res) => {
  await Saveorder.findByIdAndUpdate(req.params.id, req.body);
  Saveorder.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    return res.json(data);
  });
};

export const updateAmountWeight = async (req, res) => {
  const { weight, amount } = req.body;
  await Saveorder.updateMany(
    { _id: { $in: req.params.id } },
    {
      $set:
        weight == undefined
          ? {
              amount: amount,
            }
          : {
              amount: amount,
              weight: weight,
            },
    }
  );

  Saveorder.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    return res.json(data);
  });
};
export const changeTables = async (req, res) => {
  const { id, floor_id, id_table } = req.body;

  await Saveorder.updateMany(
    { _id: { $in: id } },
    {
      $set: {
        id_table: id_table,
        floor_id: floor_id,
      },
    }
  );

  Saveorder.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    return res.json(data);
  });
};

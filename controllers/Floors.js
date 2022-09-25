import Floors from "../modoles/Floors";
import formidable from "formidable";
import _ from "lodash";

export const create = async (req, res) => {
  try {
    await Floors.create(req.body);
    Floors.find((err, data) => {
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
  Floors.findById(id).exec((err, floor) => {
    if (err || !floor) {
      res.status(400).json({
        error: "Không tìm thấy ",
      });
    }
    req.floor = floor;
    next();
  });
};
export const read = (req, res) => {
  return res.json(req.floor);
};

export const remove = async (req, res) => {
  await Floors.findByIdAndRemove(req.params.id);

  Floors.find((err, data) => {
    if (err) {
      error: "Không tìm thấy tầng";
    }
    return res.json(data);
  });
};

export const list = (req, res) => {
  Floors.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    res.json(data);
  });
};

export const update = async (req, res) => {
  await Floors.findByIdAndUpdate(req.params.id, req.body);
  Floors.find((err, data) => {
    if (err) {
      error: "Không tìm thấy thông tin";
    }
    res.json(data);
  });
};

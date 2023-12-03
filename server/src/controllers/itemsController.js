// src/controllers/itemsController.js
const { v4: uuidv4 } = require("uuid");
let items = [];

const getAllItems = (req, res) => {
  res.json(items);
  console.log("items", items);
};

const getItem = (req, res) => {
  console.log("getItem a new item:", req.body.id);
  const item = items.find((i) => i.id === req.params);
  if (!item) return res.status(404).send("Item not found");
  res.json(item);
};

const createItem = (req, res) => {
  console.log("Creating a new item:", req.body);
  const newItem = {
    id: uuidv4(),
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
};

const updateItem = (req, res) => {
  const item = items.find((i) => i.id === req.params.id);
  if (!item) return res.status(404).send("Item not found");
  item.name = req.body.name;
  res.json(item);
};

const deleteItem = (req, res) => {
  items = items.filter((i) => i.id !== parseInt(req.params.id));
  res.status(204).send();
};

module.exports = {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};

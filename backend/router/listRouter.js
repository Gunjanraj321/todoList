const express = require("express");
const {
  createList,
  getPaginatedList,
  deleteList,
  updateMarkedDone,
} = require("../controller/todoListController");

const listRouter = express.Router();

listRouter.post("/", createList);
listRouter.get("/getList", getPaginatedList);
listRouter.delete("/:id", deleteList);
listRouter.patch("/:id", updateMarkedDone);

module.exports = listRouter;

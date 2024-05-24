const express = require("express");
const {
  getAllUsers,
  getSharedList,
  getNotification,
  deleteNotification,
  createSharedList,
  updateSharedList,
  updateMarkedDone,
  deleteSharedList
} = require("../controller/sharedListController");

const sharedRouter = express.Router();

sharedRouter.get("/users", getAllUsers);

sharedRouter.get("/notify", getNotification);
sharedRouter.delete("/notify/:id", deleteNotification);
sharedRouter.patch("/notify/:id", updateSharedList);

sharedRouter.post("/:id", createSharedList);
sharedRouter.get("/list", getSharedList);
sharedRouter.delete("/list/delete/:id", deleteSharedList);
sharedRouter.patch("/list/update/:id", updateMarkedDone);

module.exports = sharedRouter;

const List = require("../model/listModel");
const User = require("../model/userModel");

//function for getting all paginated todo-list 
const getPaginatedList = async (req, res) => {
  try {
    const userId = req.user.userId;
    const rows  = await List.findAll({
      where: { userId: userId },
      attributes: ["id", "title", "description","markedDone"],
    });
    
    res.json({
      lists: rows,
    });
    // console.log("successfully dispatched the data");
  } catch (error) {
    console.error("Error fetching paginated lists:", error);
    res.status(500).json({
      error: "An error occurred while fetching paginated lists.",
    });
  }
};

// funcction for creating the todo-list
const createList = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user;

    const newList = await List.create(
      {
        title,
        description,
        userId: req.user.userId,
      }
    );

    res.status(201).json("todo-list stored successfully");
  } catch (error) {
    console.error("Error creating todo-list:", error);
    res.status(500).json({
      error: "An error occurred while inserting the user.",
    });
  }
};

// delete function for deleting list by their id
const deleteList = async (req, res) => {
  const listId = req.params.id;
  try {

    const rowsAffected = await List.findOne({
      where: { id: listId }
    });

    if (!rowsAffected) {
      return res.status(404).json({
        error: "List not found",
      });
    }

    await List.destroy({
      where: { id: listId },
    });

    console.log("data deleted");
    res.json({
      message: "List deleted successfully",
    });
  } catch (error) {
    console.error("error deleting list:", error);
    res.status(500).json({
      error: "An error occurred while deleting the list.",
    });
  }
};

//update fnction for updating the list by their id
const updateMarkedDone = async (req, res) => {
  const listId = req.params.id;
  try {
    const userId = req.user.userId;

    const rowsAffected = await List.findOne({
      where: { id: listId }
    });

    if (!rowsAffected) {
      return res.status(404).json({
        error: "List not found",
      });
    }
    const row = await List.update(
      {
        markedDone:true
      },
      {
        where: { id: listId, userId: userId }
      }
    );

    const updatedExpense = await List.findOne({
        where: {id: listId}
    })

    console.log("data updated");
    res.json(updatedExpense);
  } catch (error) {
    console.error("error updating todo-list:", error);
    res.status(500).json({
      error: "An error occurred while updating the list.",
    });
  }
};

module.exports = {getPaginatedList, createList, deleteList, updateMarkedDone};





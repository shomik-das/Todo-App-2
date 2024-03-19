const Task = require('../models/todoModel');

const updateStatus = async (req, res) => {
  const { id, status } = req.body;
  try {
    const updatedStatus = await Task.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedStatus) {
      res.status(404).send("Task not found.");
    }
    else{
      res.send("Status updated");
    }
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {updateStatus};













// Task: This is the Mongoose model for your tasks. It represents a collection in your MongoDB database.

// findByIdAndUpdate(): This is a Mongoose method used to find a document by its _id field and update it. It takes three arguments:

// id: The ID of the document to find and update.
// { status }: The update object. Here, we're specifying the field status and its new value.
// { new: true }: An options object that specifies that the updated document should be returned. By default, Mongoose returns the original document before the update.
// So, await Task.findByIdAndUpdate(id, { status }, { new: true }) finds the document with the given id, updates its status field, and returns the updated document. This updated document is then stored in the updatedTask variable.

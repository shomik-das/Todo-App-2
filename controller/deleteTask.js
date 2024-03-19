const Task = require('../models/todoModel');

const deleteTask = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      res.send("Task deleted successfully");
    } else {
      res.send("ID not found");
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {deleteTask};

const Task = require('../models/todoModel');

exports.addTask = async (req, res) => {
  const { title, status } = req.body;
  try {
    const newTask = await Task.create({ title, status });
    res.status(201).send(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).send("Internal Server Error");
  }
};

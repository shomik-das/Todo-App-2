
const Task = require("../models/todoModel")
const getAllTasks = async (req, res) => {
  try{
    const tasks = await Task.find();
    res.json(tasks);
  }
  catch(err){
    console.error('Error fetching tasks:', err);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = { getAllTasks };

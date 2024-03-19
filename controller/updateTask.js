const Task = require("../models/todoModel");
const updateTask = async (req, res) => {
    const { id, title } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, {title}, {new:true});
        if(updateTask){
            res.send("task updated")
        }
        else{
            res.status(404).send("id not found")
        }
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { updateTask };

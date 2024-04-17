const TasksModel = require('../models/TasksModel')

//create task
exports.createTask = async (req, res) => {
    try {
        const reqBody = req.body;
        reqBody.email = req.headers['email']
        const data = await TasksModel.create(reqBody);
        res.status(200).json({ status: "success", data: data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

//Delete
exports.deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id };
        const data = await TasksModel.deleteOne(query);
        if (data.deletedCount > 0) {
            res.status(200).json({ status: "success", message: "Product deleted successfully" });
        } else {
            res.status(404).json({ status: "fail", message: "Product not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

//update task status
exports.updateTaskStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        const query = { _id: id };
        const reqBody = {status:status}
        const data = await TasksModel.updateOne(query, reqBody);
        if (data) {
            res.status(200).json({ status: "success", data: data });
        } else {
            res.status(404).json({ status: "fail", message: "Product not found or no modifications made" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

//list task by status

exports.listTaskByStatus = async (req, res) => {
    try {
        
        const status = req.params.status;
        let email = req.headers['email']
    
        const data = await TasksModel.aggregate([
            {$match:{status:status,email:email}},
            {$project:{
                _id:1,title:1,description:1,status:1,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }}
        ]);
        if (data) {
            res.status(200).json({ status: "success", data: data });
        } else {
            res.status(404).json({ status: "fail", message: "Product not found or no modifications made" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}

//task status count

exports.taskStatusCount = async (req, res) => {
    try {
        
        
        let email = req.headers['email']
    
        const data = await TasksModel.aggregate([
            {$match:{email}},
            {$group:{
                _id:"$status",sum:{$count:{}}
                
                
            }}
        ]);
        if (data) {
            res.status(200).json({ status: "success", data: data });
        } else {
            res.status(404).json({ status: "fail", message: "Product not found or no modifications made" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
}
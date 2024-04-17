const express = require('express');
const UsersController = require('../controllers/UsersController')
const TasksController= require('../controllers/TasksController')
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware')
const router = express.Router();


router.post("/registration",UsersController.registration);

//login
router.post("/login",UsersController.login);
//update

router.post("/profileUpdate",AuthVerifyMiddleware,UsersController.profileUpdate);

router.post("/createTask",AuthVerifyMiddleware,TasksController.createTask);

router.get("/deleteTask/:id",AuthVerifyMiddleware,TasksController.deleteTask);

router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,TasksController.updateTaskStatus);
router.get("/listTaskByStatus/:status",AuthVerifyMiddleware,TasksController.listTaskByStatus);
router.get("/taskStatusCount",AuthVerifyMiddleware,TasksController.taskStatusCount);
router.get("/profileDetails",AuthVerifyMiddleware,UsersController.profileDetails);
router.get("/RecoverVerifyEmail/:email",UsersController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",UsersController.RecoverVerifyOTP);
router.post("/RecoverResetPass",UsersController.RecoverResetPass);


module.exports=router;
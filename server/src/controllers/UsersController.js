const OTPModel = require("../models/OTPModel");
const UsersModel = require("../models/UsersModel");
const jwt = require('jsonwebtoken');
const SendEmailUtility = require("../utility/SendEmailUtility");
//Registration
exports.registration = async (req, res) => {
    let reqBody = req.body;
    try {
        let data = await UsersModel.create(reqBody);
        res.status(200).json({ status: "success", user: data });
    } catch (error) {
        res.status(200).json({ status: "fail", data:error });
    }
}

//login
exports.login=(req,res)=>{
    let reqBody=req.body;
    

const query = UsersModel.aggregate([
    {$match:reqBody},
    {$project:{_id:0,email:1,firstName:1,lastName:1,mobile:1,photo:1}}
]);

query.exec()
    .then(data => {
        if (data.length > 0) {
            //create auth token
            let Payload={exp:Math.floor(Date.now()/1000)+(24*60*60),data:data[0]['email']}
            let token = jwt.sign(Payload,'SecretKey12345');
            res.status(200).json({ status: "success",token:token, data: data[0]});
        } else {
            res.status(401).json({ status: "unauthorized" });
        }
    })
    .catch(err => {
        res.status(400).json({ status: "fail", data: err });
    });

   
}

exports.profileUpdate=async(req,res)=>{
    try {
        let email = req.headers.email;
        let reqBody = req.body;
       const update =await UsersModel.updateOne({email:email},reqBody)
       
       if (update) {
        res.status(200).json({ status: "success", data: update });
    } else {
        res.status(404).json({ status: "fail", message: "Profile not found" });
    }
    } catch (e) {
        
        res.status(401).json({ status: "unauthorized", message: "Profile not found" });
        console.log(e);
    }
}

exports.profileDetails= async(req,res)=>{
 try {
    let email = req.headers['email'];
    let data = UsersModel.aggregate([
        {$match:{email:email}},
        {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
    ])
    if (data) {
        res.status(200).json({status:"success",data:data})
        
    } else {
        res.status(400).json({status:fail})
    }
    
 } catch (error) {
    res.status(400).json({status:"fail",data:e})
    
 }
}

exports.RecoverVerifyEmail=async(req,res)=>{
    
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000)
    try {
        //email account query
        let UserCount = (await UsersModel.aggregate([{$match:{email:email}},{$count:"total"}]))
        if(UserCount.length>0){
         //OTP Insert
         let CreateOTP = await OTPModel.create({email:email , otp:OTPCode})
         let SendEmail = await SendEmailUtility(email,"Your PIN code id : "+OTPCode ,"Task Manager PIN Verification")
          res.status(200).json({status:"success",data:SendEmail})
        }else{
            res.status(200).json({status:"fail",data:"No User Found"})
        }
    } catch (e) {
        res.status(200).json({status:"fail",data:e})
    }
    }

exports.RecoverVerifyOTP = async(req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;
   try {
    
    
    let OTPCount = (await OTPModel.aggregate([{$match:{email:email,otp:OTPCode,status:status}},{$count:"total"}]))
    if(OTPCount.length>0){
        let OTPUpdate = await OTPModel.updateOne({email:email,otp:OTPCode,status:status},{email:email,otp:OTPCode,status:statusUpdate})
        res.status(200).json({status:"success",data:OTPUpdate})
    }
    else{
        res.status(200).json({status:"fail",data:"invalid otp code"})
    }
   } catch (error) {
    res.status(200).json({status:"fail",data:error})
   }
}

exports.RecoverResetPass = async (req, res) => {
    let email = req.body['email'];
    let OTPCode = req.body['OTP'];
    let NewPass = req.body['password'];
    let statusUpdate = 1;
    try {
        // Check if the OTP code is valid and hasn't been used before
        let OTPUsedCount = await OTPModel.aggregate([
            { $match: { email: email, otp: OTPCode, status: statusUpdate } },
            { $count: "total" }
        ]);
        if (OTPUsedCount.length > 0) {
            // Update the user's password
            let PassUpdate = await UsersModel.updateOne({ email: email }, { password: NewPass });
            // Optionally, you can delete the OTP record after it's been used
            // await OTPModel.deleteOne({ email: email, otp: OTPCode });
            res.status(200).json({ status: "success", data: PassUpdate });
        } else {
            res.status(400).json({ status: "fail", message: "Invalid OTP code" });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error", error: error });
    }
}

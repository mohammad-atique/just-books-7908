
const express = require("express");
const User = require("../models/user.model");
const uploads = require("../middlewares/uploads");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const uploadToCloudinary = require("../middlewares/cloudinary.upload");
const router = express.Router();

router.patch("/edit",uploads.single("image"),async(req,res)=>{
    try {
        const user1 = await User.findOne({ email: req.user.email });
        // console.log("user1===>",req.body)
        if (user1) {

            var locaFilePath = req.file.path;
            // console.log("locaFilePath===>",locaFilePath)
            var result = await uploadToCloudinary(locaFilePath);
            // console.log("result===>",result)
            const user = await User.findOneAndUpdate({email:req.user.email},{profilePic: result.url,...req.body})
            // console.log("res===.>",user)
            res.status(200).send({messsage:"Successfully Updated",data:user})
            
        } else {
            return res.status(401).send({
                message:"Not authorized"
               });
        }
      } catch (err) {
        return res.status(500).send({ message: err.message, data: err });
      }
    })

module.exports = router;
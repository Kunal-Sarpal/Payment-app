const express = require('express');
const zod   = require('zod');
const jwt = require('jsonwebtoken');
const { lstat } = require('fs');
const { findSourceMap } = require('module');
const { User } = require('../db');
const JWT_SECRET = require('../config');

const router = express.Router();
const signupSchema = zod.object({
    username: zod.string().email(),
    lastname: zod.string().min(3),
    firstname:  zod.string().min(3),
    password: zod.string().min(6),
})

router.post("/signup",(req,res)=>{
    const body = req.body;

    const {success} = signupSchema.safeParse(body);

    if(!success){
        return res.send(403).json({
            msg:"Email already taken / Incorrect inputs" 
        })
    }
    
        const user = User.findOne({
            username: body.username
        })
        if(user._id){
            return res.send(403).json({
                msg:"Email already taken / Incorrect inputs"
            })
        }

        const newuser = User.create(body);
        const userId = newuser._id;
        const token = jwt.sign({userId},JWT_SECRET);

        res.json({
            msg: "User Successfully created",
            token
        })
    

})

module.exports = router;
// /api/v1/user
// /api/v1/transaction
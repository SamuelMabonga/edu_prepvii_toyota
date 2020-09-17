const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.post('/', async(req,res)=>{

const emailExist = await User.findOne({email: req.body.email});
if(emailExist) return res.status(400).send('User already exists');

//Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);

//Create a new user
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        question:req.body.question
    });
    try{
        //Getting the user and saving
         const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
   
});




module.exports = router;

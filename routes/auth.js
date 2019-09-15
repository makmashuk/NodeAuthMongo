const router = require('express').Router();
const User = require('../model/user');
const { registerValidation } =require('../validation/authValidtion');
const bcrypt = require ('bcryptjs');


router.post('/register', async (req,res)=>{

   
    /* Validating User Input */
    const { error } = registerValidation(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
    }

    /* Checking If User Already Exists*/
    const emailExist = await User.findOne({email :req.body.email });
    if(emailExist){
        return res.status(400).send("Email Already Exists");
    }


    /* Hash The Password */

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);

   
    /*Create New User  */
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password: hashpassword
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);

    } catch(err){
        req.status(400).send(err);
    }

});


module.exports= router;
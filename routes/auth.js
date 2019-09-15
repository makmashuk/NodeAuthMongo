const router = require('express').Router();
const User = require('../model/user');
const { registerValidation } =require('../validation/authValidtion');


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
   
    /*Create New User  */
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);

    } catch(err){
        req.status(400).send(err);
    }

});


module.exports= router;
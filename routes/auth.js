const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require ('bcryptjs');
const { registerValidation,loginValidation } = require('../validation/authValidtion');


router.post('/register', async (req,res)=>{

    /* Validating User Input */
    const { error } = await registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
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

router.post('/login',async (req, res) => {

    /* Validating User Input  */
    const { error } = await loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    /* Checking Email Verification */
    const getUserByEmail =await User.findOne({email:req.body.userEmail});
    if(!getUserByEmail){
        return res.status(400).send("Email Or Password Not Matched");
    }

    const validPassword = await bcrypt.compare(req.body.userPassword, getUserByEmail.password)
    if(!validPassword){
        return res.status(400).send("Email Or Password Not Matched");
    }
    res.send("Logged In Success!!!");
    
});


module.exports= router;
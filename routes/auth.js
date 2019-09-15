const router = require('express').Router();
const User = require('../model/user');
const { loginValidation } =require('../validation/authValidtion');


router.post('/register', async (req,res)=>{

    try{
        const { error } = await loginValidation(req.body);
        if(error){
            res.status(400).send(error.details[0].message);
        }
    } catch (err){
        res.status(400).send(err);
    }

   
    res.send("Success");


    // const user = new User({
    //     name:req.body.name,
    //     email:req.body.email,
    //     password: req.body.password
    // });
    // try {
    //     const savedUser = await user.save();
    //     res.send(savedUser);

    // } catch(err){
    //     req.status(400).send(err);
    // }

});


module.exports= router;
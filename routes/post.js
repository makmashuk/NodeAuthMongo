const router = require('express').Router();
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, (req,res)=> {

    const post = {
        "title": "a new post",
        "des": "Post Description"
    };

    res.send(post);
});

module.exports = router ;
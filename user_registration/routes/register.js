const { User, validation } = require('../models/user');
const express = require('express');
const jwt=require('jsonwebtoken');
const _=require('lodash')
const router = express.Router();
const bcrypt = require('bcrypt');
router.use(express.json());

router.post('/', async (req, res) => {
    const { error } = validation(req.body);

    if (error) {
        res.status(403).json(error.details[0].message);
    }

   

    const exuser = await User.findOne({ email: req.body.email });
    if (exuser) {
        res.json('user email alredy exist !' + exuser);
    } else {

        // res.send("User registerd");
        

        const saltRound = 10;
    const myPlaintextPassword = req.body.password;
    bcrypt.genSalt(saltRound, function (err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            const newuser = new User({
                
                name: req.body.name,
                email: req.body.email,
                password: hash

            })

            //Lodash
           
            const _token = jwt.sign({_id:newuser._id},process.env.json_web_token);
            //  newuser.token=_token;

            newuser.save()
                // .then(result => res.json('user registered !'))
                .then(console.log('user registered !'))
                .catch(err => console.log(err))
               const obj=_.pick(newuser,['name','email']);
                // obj.token=_token
                res.header("x-auth-token",_token).json(obj);
                //save user in db
        });
    });
    }
    


});


// exports.router=router
module.exports = router 

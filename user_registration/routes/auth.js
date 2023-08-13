const { User } = require('../models/user');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt=require('jsonwebtoken');
router.use(express.json());
router.post('/', async (req, res) => {
    const { error } = validation(req.body);

    if (error) {
        res.status(403).json(error.details[0].message);
    }

   

    const exuser = await User.findOne({ email: req.body.email });
    if (!exuser) {
        res.json('user email does not exist !' + exuser);
    }else {

        const pass=await bcrypt.compare(req.body.password,exuser.password);

        if(pass){
            // jwt token
            // const token = jwt.sign({_id:exuser._id},"MySecret");
            // res.json(token);
            const token = jwt.sign({_id:exuser._id},process.env.json_web_token);
            const newuser={
                token:token,
                name:exuser.name,
                email:exuser.email
            }
            res.json(newuser);


            // res.json('Logged In');
        }else{
            res.json('Wrong password');
        }

    //     // res.send("User registerd");
    //     const saltRound = 10;
    // const myPlaintextPassword = req.body.password;
    // bcrypt.genSalt(saltRound, function (err, salt) {
    //     bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
    //         const newuser = new User({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: hash

    //         })

    //         //Lodash

    //         newuser.save()
    //             .then(result => res.json('user registered !'))
    //             .catch(err => console.log(err))
    //             res.json(_.pick(newuser,['name','email']));

    //             //save user in db
    //     });
    // });
    }
    


});

const validation=(user)=>{
    const schema=Joi.object({
        email:Joi.string()
                .required()
                .email({minDomainSegments:2,tlds:{allow:['com','net']}}),
        password:Joi.string()
                    .required()
                    .min(5)
                    .max(50)        
    })
    return schema.validate(user)
}


// exports.router=router
module.exports = router 

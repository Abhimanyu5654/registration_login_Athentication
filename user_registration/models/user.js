const mongoose=require('mongoose');
const Joi=require('joi');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        min:3,
        max:50,
        required:true
    },
    email:{
        type: String,
        min:5,
        max:255,
        required: true,
        unique:true,
        email:true           


    },
    password:{
        type:String,
        required:true,
        min:5,
        max:1042
        
    }
})


const User=mongoose.model('User',userSchema);


const validation = (user)=>{

    const Schema=Joi.object({
        name:Joi.string().min(3).max(50).required(),
        email:Joi.string().min(5).max(255)
                 .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                 .required(),
        password:Joi.string().min(5).max(1042).required()
    })
    
    return Schema.validate(user);


}

exports.User = User
exports.validation = validation

// module.exports = {
//     User,
//     validation
// }
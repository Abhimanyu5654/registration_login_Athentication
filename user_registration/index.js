const express=require('express');
const regusers=require('./routes/register');
const authusers=require('./routes/auth');
const mongoose = require('mongoose');
const app=express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(console.log("connected"))
.catch(err => res.json(err));

//localhost:2000/api/user
app.use('/api/user',regusers);

//localhost:2000/api/user
app.use('/api/auth',authusers);



app.listen(2000,()=>{
    console.log("On port no. 2000");
})
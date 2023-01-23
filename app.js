const express = require('express')
const dotenv= require('dotenv')
const bodyParser=require('body-parser')

const app=express();
 //const dotenv= require('dotenv')
app.use(bodyParser.json())


//get info
// app.get('/',(req,res) => {
//     res.send("Hello World");
// });

// app.get('/employees',(req,res) => {
//     res.send("employees");
// });
const connectDB= require('./config/db');


dotenv.config({ path: './config/config.env'});

connectDB();

app.use('/', require('./routes/index'));

app.listen(3000);

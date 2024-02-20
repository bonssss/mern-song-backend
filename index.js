const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');




const PORT_URL = process.env.PORT || 5000;
const MONGO_URL ='mongodb+srv://song:YCKqPJbQ9r2gsVWH@cluster0.4dha8zo.mongodb.net/?retryWrites=true&w=majority'


//middle ware
app.use(cors());

app.use(express.json());
mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log("connected succesfully");
}).catch((error)=>{
    console.error("Mongo error:" + error)
})

// app.get('/',(req,res)=> {
//     res.send("welcome to song  management");
// })

const songRouter = require('./routes/songs');
const statisticsRouter = require('./routes/statistics')
app.use('/api',songRouter);
app.use('/api', statisticsRouter);


app.listen(PORT_URL,()=>{
    console.log("listening on port" + " "+ PORT_URL);
})
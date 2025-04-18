const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(express.json())
const corsOptions = {
    origin: function(origin,callback){
      const allowedOrigins = ["http://localhost:5173"]
      if( allowedOrigins.includes(origin)){
        callback(null,true)
      }
      else{
        callback(new Error('Not Allowed by Cors'))
      }
    },
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization']
    
  };
  app.use(cors(corsOptions));
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

const menuRoutes = require('./routes/menuRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/',menuRoutes)
app.use('/menuItem',menuItemRoutes)

app.listen(process.env.PORT,() =>{
    console.log("Server is running on port 5000");    
})

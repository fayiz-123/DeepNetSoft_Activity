const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

const menuRoutes = require('./routes/menuRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')

app.use('/',menuRoutes)
app.use('/menuItem',menuItemRoutes)

app.listen(process.env.PORT,() =>{
    console.log("Server is running on port 5000");    
})

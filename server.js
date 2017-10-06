//Dependencies
let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let config = require('./config')
let homeRoute = require('./api/routes/homeRoute')

//Initialize app
let app = express()

//Define PORT number
const port = process.env.PORT || 3001

//Connect to Database
mongoose.connect(config.DATABASE_URI)

//Use body-parser to accept post requests
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Use different routes
app.use('/' , homeRoute)

//Start the server
app.listen(port, () => {
  console.log("Server is LIVE at port "+port)
})
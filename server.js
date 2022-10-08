const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
// importin Router
const UserRoute = require('./routes/userRoute')
// loading the env file
const errorHandler = require('./middleware/errorMiddleware')
dotenv.config({ path: './config/config.env'})
// initailize the application
const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

// assign port 
const PORT = process.env.PORT || 3000

// connection to the mongodb
connectDB()

// middleware for routes
app.use('/api/v1/user', UserRoute)

// middleware for errorHandler
app.use(errorHandler)


const server = app.listen(PORT, console.log(`Server running in MODE ON PORT ${PORT}`))



// Handle Unhandle promise rejection
process.on('unhandleRejection', (err, promise) => {
    console.log(`Error: ${err.message.red.bold}`)
    // close the server
    server.close(() => process.exit(1))
})
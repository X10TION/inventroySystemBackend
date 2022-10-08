const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./config/db')
// loading the env file
dotenv.config({ path: './config/config.env'})
// initailize the application
const app = express()

// assign port 
const PORT = process.env.PORT || 3000

// connection to the mongodb
connectDB()

const server = app.listen(PORT, console.log(`Server running in MODE ON PORT ${PORT}`))



// Handle Unhandle promise rejection
process.on('unhandleRejection', (err, promise) => {
    console.log(`Error: ${err.message.red.bold}`)
    // close the server
    server.close(() => process.exit(1))
})
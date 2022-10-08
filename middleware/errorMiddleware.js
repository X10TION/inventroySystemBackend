const ErrorResponse = require('../utils/errorResponse')
const errorHandler = (err, req, res, next) =>{
   let error = { ...err}
   error.message = err.message
    console.log(err.errors)
    // console.log(err.name)

    // mongoose bad object id
    if(err.name == 'CastError'){
        const message = `Resouces not found with id ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // mongoose dublicated key
    if(err.code === 11000){
        const message = "Dublicate field value enter"
        error = new ErrorResponse(message, 400)

    }

    // mongoose validation error for fill field
    if(err.errors === "ValidatorError"){
        const messag = Object.values(err.errors.properties).map(val => val.messag)
        error = new ErrorResponse(messag, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler 
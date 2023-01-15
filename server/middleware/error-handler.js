// dont need for this setup
const { CustomAPIError } = require('../errors')

const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // let customError = {
  //   // set default 
  //   statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,

  //   msg : err.message || 'Something went wrong',
  // }
  
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message})
  
// validation errors
// bad request error if no email no password register or login request 

// if(err.name === 'ValidationError'){
//   customError.msg = Object.values(err.errors)
//   .map((item)=>
//     item.message)
//     .join(',')
//   customError.statusCode = 400;  
// }
// // cast error in a jobs controller
// if(err.name === 'CastError'){
//   customError.msg = `No job found with id ${err.value}`
//   customError.statusCode = 404
// }
// // duplicate
//   if(err.code && err.code===11000){
//     customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose another one`
//     customError.statusCode = 400
//   }
  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  // return res.status(customError.statusCode).json({msg : customError.msg });
}

module.exports = errorHandlerMiddleware

const Joi = require('joi')
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    code:String,
    name:String, 
    duration:Number,
    fee:Number,
    credit:Number                                  //nested documents
})


// const validateUser = (user) => {
//     const schema = Joi.object({
//         name: Joi.string()
//         .min(3)
//         .max(10)
//         .lowercase()
//         .required()
//         .messages({
//             "string.min": "Name must be at least 3 characters long.",
//             "string.max": "Name must be no more than 10 characters long.",
//             "any.required": "Name is required."
//         }),
        
//         email: Joi.string()
//         .email()
//         .messages({
//             "string.email": "Please enter a valid email address."
//         }),
        
//         password: Joi.string()
//         .min(8)
//         .required()
//         .messages({
//             "string.min": "Password must be at least 8 characters long.",
//             "any.required": "Password is required."
//         }),
        
//         rollNo: Joi.number()
//         .required()
//         .messages({
//             "any.required": "Roll number is required."
//         })
//     });
    
//     return schema.validate(user)
// }

// module.exports.User = mongoose.model('User', userSchema)
// module.exports.validate = validateUser

//OR 

module.exports = mongoose.model('Course',courseSchema)
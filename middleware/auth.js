const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
const token=req.header('x-auth-token')

const varified=jwt.verify(token, process.env.JWT_SECRET)
next()
}
module.exports=auth
const {Router}=require("express")
const {z}=require('zod')
const { User } = require("../db")
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../env")
const router=Router()

const userCheck=z.object({
    username:z.string().email(),
    password:z.string().min(6),
})

router.post("/",async (req,res)=>{
   const zodCheck=userCheck.safeParse(req.body)
   const {username,password}=req.body
   if(!zodCheck.success){
    const issues=zodCheck.error?.issues||[]
    const errorDetails=issues.map(issue=>{
        const {message,path}=issue;
        const errorName=path.join('.')||"Unknown"
        return{
            error:message,
            path:errorName
        }
   })
    return res.status(411).json({
        Issue :errorDetails
    })
   }
   const userExist=await User.findOne({
    username,password
   })
   if(!userExist){
    return res.status(401).json({
        msg:"Invalid Username or password"
    })
   }
   const token=jwt.sign({userId:userExist._id},JWT_SECRET)
   if(userExist){
    return res.status(200).json({
        token
    })
   }
})

module.exports=router
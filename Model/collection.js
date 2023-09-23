const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    accno:Number,
    username:String,
    psw:String,
    balance:Number,
    transactions:[]

})
const users=new mongoose.model("users",userSchema)
module.exports=users
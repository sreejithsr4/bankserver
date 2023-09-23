require('dotenv').config()

const express = require('express')
const router = require('./Routes/router')
const cors = require('cors')



const server = express()
server.use(express.json())
//integration
server.use(cors())
//Router set
server.use(router)

require('./Database/connection')
const port = 5006 || process.env.port

server.listen(port, () => { console.log(`________server started at port number ${port}___________`); })
// server.post('/register',(req,res)=>{
//     res.send("response is working")
// })
// server.post('/logined',(req,res)=>{
//    res.send("login is working") 
//    console.log(req.body.psw);
// })
// server.get('/login',(req,res)=>{
//     res.send("its working")
    
// })
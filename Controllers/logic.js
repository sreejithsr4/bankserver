const users = require("../Model/collection")
const jwt = require('jsonwebtoken')
//register account creation
register = (req, res) => {
    // acno=req.body.acno
    // const {acno}=req.body
    // psw=req.body.psw
    // const {psw}=req.body
    // uname=req.body.uname
    // const {uname}=req.body
    // destructuring
    const { accno, username, psw } = req.body
    //check user data in collection
    users.findOne({ accno }).then(user => {
        if (user) {
            // res.send("user already exists")
            res.status(400).json({
                message: "user already exists",
                status: false,
                statusCode: 400
            })
        }
        else {
            //create new object for user
            let newUser = new users({
                accno,
                username,
                psw,
                balance: 0,
                transactions: []

            })
            //save in db
            newUser.save()
            // res.send("account created successfully")
            res.status(201).json({
                message: "account created successfully",
                status: true,
                statusCode: 201
            })
        }
    })
}


login = (req, res) => {
    //access data
    const { accno, psw } = req.body
    users.findOne({ accno, psw }).then(user => {
        if (user) {
            //create token
            const token = jwt.sign({accno},"secretkey123")
            res.status(200).json({
                message: "login successfull",
                status: true,
                statusCode: 200,
                currentUser: user.username,
                token
            })
        }
        else {
            res.status(404).json({
                message: "incorrect account number or password",
                status: false,
                statusCode: 404
            })
        }
    })
}

getBalance = (req, res) => {
    const { accno } = req.params

    users.findOne({ accno }).then(user => {
        if (user) {
            res.status(200).json({
                message: user.balance,
                status: true,
                statusCode: 200,

            })
        }
        else {
            res.status(404).json({
                message: "User Doesnot exist",
                status: false,
                statusCode: 404
            })
        }
    })

}

moneyTransfer = (req, res) => {

    const { sAcno, rAcno, psw, amount,date } = req.body
    // convert amount to number
    var amnt = parseInt(amount)

    users.findOne({ accno: sAcno, psw }).then(suser => {
        if (suser) {

            users.findOne({ accno: rAcno }).then(ruser => {
                if (ruser) {
                    if (amnt <= suser.balance) {
                        //update sender object
                        suser.balance=suser.balance-amnt
                        suser.transactions.push({tAcno:rAcno,Amount:amnt,method:"DEBIT",Date:date})
                        suser.save()
                        //update reciever object
                        ruser.balance=ruser.balance+amnt
                        ruser.transactions.push({tAcno:sAcno,Amount:amnt,method:"CREDIT",Date:date})
                        ruser.save()

                        res.status(200).json({
                            message: "Transaction Successful",
                            status: true,
                            statusCode: 200,
            
                        })


                    }
                    else {
                        res.status(406).json({
                            message: "Insufficient Balance",
                            status: false,
                            statusCode: 406
                        })
                    }

                }
                else {
                    res.status(404).json({
                        message: "Invalid credit Credentials",
                        status: false,
                        statusCode: 404
                    })
                }
            })

        }
        else {
            res.status(404).json({
                message: "Invalid Debit Credentials",
                status: false,
                statusCode: 404
            })
        }

    })
}

accountStatement=(req,res)=>{
    const {accno}=req.params
    users.findOne({accno}).then(user=>{
        if(user){
            res.status(200).json({
                message:user.transactions,
                status:true,
                statusCode:200
            })

        }
        else{
            res.status(404).json({
                message: "User Doesnot exist",
                status: false,
                statusCode: 404
            }) 
        }

    })
}
accountDelete=(req,res)=>{
    const {accno}=req.params
    users.deleteOne({accno}).then(data=>{
        if(data){
            res.status(200).json({
                message:"Account deleted successfully",
                status:true,
                statusCode:200
            })
        }
     

    })

}



module.exports = { register, login, getBalance,moneyTransfer,accountStatement,accountDelete }
const express=require('express')
const { register, login, getBalance, moneyTransfer, accountStatement, accountDelete } = require('../Controllers/logic')
const {jwtMiddleware}=require('../middleware/jwtmiddleware')
//router object
const router=new express.Router()
//create acccount
router.post('/bankuser/create_account',register)

//login
router.post('/bankuser/login',login)
//balance
router.get('/bankuser/balance/:accno',jwtMiddleware,getBalance)

//moneytransfer
router.post('/bankuser/money-transfer',jwtMiddleware,moneyTransfer)
//accunt statement
router.get('/bankuser/account-statement/:accno',jwtMiddleware,accountStatement)

//delete account
router.delete('/bankuser/delete-account/:accno',jwtMiddleware,accountDelete)
//export router
module.exports=router
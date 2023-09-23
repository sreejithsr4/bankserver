const express=require('express')
const { register, login, getBalance, moneyTransfer, accountStatement, accountDelete } = require('../Controllers/logic')
const {jwtmiddleware}=require('../middleware/jwtmiddleware')
//router object
const router=new express.Router()
//create acccount
router.post('/bankuser/create_account',register)

//login
router.post('/bankuser/login',login)
//balance
router.get('/bankuser/balance/:accno',jwtmiddleware,getBalance)

//moneytransfer
router.post('/bankuser/money-transfer',jwtmiddleware,moneyTransfer)
//accunt statement
router.get('/bankuser/account-statement/:accno',jwtmiddleware,accountStatement)

//delete account
router.delete('/bankuser/delete-account/:accno',jwtmiddleware,accountDelete)
//export router
module.exports=router
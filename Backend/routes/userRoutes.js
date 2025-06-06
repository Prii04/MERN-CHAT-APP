const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');

//create an instance of router from express
const router=express.Router();
//use this router to handle user related routes
router.route('/').post(registerUser);   //(registration of user)
router.post('/login',authUser);

module.exports=router;


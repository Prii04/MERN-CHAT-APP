// To handle errors in this automatically we have a package called express-async-handler.
const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const generateToken = require('../config/generateToken');


const registerUser=asyncHandler(async (req,res) => {
    const {name,email,password,pic} = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }     // if any of these is undefined or empty, we throw an error

    //check if user already exists and query the database
    const userExists = await User.findOne({ email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    //create a new user
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id), //generate a token for the user
        }) //after registration, send a jwt token to the user
    }
    else{
        res.status(400);
        throw new Error("Failed to create the user");
    }
});

const authUser= asyncHandler(async (req, res) => {
    const {email, password}=req.body;

    const user= await User.findOne({email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id), //generate a token for the user
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, authUser };
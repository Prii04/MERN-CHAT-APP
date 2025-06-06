// create a token for the user after registration or login
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id },process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
};

module.exports = generateToken;
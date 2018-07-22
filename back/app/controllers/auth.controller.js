const jwt = require('jsonwebtoken');
const config = require('../../config/auth.config.js');
const User = require('../models/user.model.js');
const payload = require('../../config/payload.config.js');
const bcrypt = require('bcryptjs')
var session

// create a token
function createToken(userid){
    return jwt.sign({ id: userid }, config.secret, {
        expiresIn: config.expiresIn
    });
}

// Hash password 
function hashPassword(password){
    return bcrypt.hashSync(password, 8);
}

function ValidateRequestBody(body) {
    if(!body.email) {
        return {
            valid: false,
            message: "User Email field can not be empty"
        }
    }
    if(!body.password) {
        return {
            valid: false,
            message: "User Password field can not be empty"
        }
    }
    return {
        valid: true
    }
}

// Create and Save a new User
exports.login = (req, res) => {
    // Validate request
    let isValidBody = ValidateRequestBody(req.body).valid
    if(!isValidBody) {
        return res.status(400).send({
            message: isValidBody.message
        });
    }

    let email = req.body.email
    let password = req.body.password

    User.findOne({
        "email": email
    })
    .then(user => {
        if(!user) {
            return res.status(400).send(payload.error("User not found with id " + req.params.id));            
        }
        let isValidPassword = bcrypt.compareSync(password,user.password);
        if(!isValidPassword) {
            return res.status(400).send(payload.error("Incorrect user email or password!"));            
        }
        session = req.session
        session.user = user
        res.status(200).send(payload.success(
            {
                auth: true, 
                user: {
                    name:user.name,
                    email: user.email
                },
                token: createToken() 
            }
        ));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving user."
        });
    });
}

function checkSession(req, res) {
    session = req.session
    if(!session){
        res.status(403).send(payload.error({ auth: false, message: 'Failed to get session.' }))
        return false
    }
    return true
}

function checkUser(req, res) {
    session = req.session
    let user = session.user
    if(user==undefined || !user){
        res.status(403).send(payload.error({ auth: false, message: 'Failed to get user. Please reload your token!' }));
        return false
    }
    return user
}

function getHeaderToken(req,res) {
    if(!req.headers || !req.headers['app-access-token']) {
         false
    }
    return req.headers['app-access-token']
}

exports.verifyToken = (req, res, next) => {
    if(!checkSession(req, res)) return false

    var token = getHeaderToken(req, res);
    if (!token) {
        return res.status(401).send(payload.error({ auth: false, message: 'No header app-access-token provided.' }));
    }
    
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(403).send(payload.error({ auth: false, message: 'Failed to authenticate token.' }))
        }
        next()
    });
}

exports.getUserSession = (req, res) => {
    var user = checkUser(req, res)
    if(!user) return false

    return {
        id: user._id,
        name: user.name,
        email: user.email
    }
}
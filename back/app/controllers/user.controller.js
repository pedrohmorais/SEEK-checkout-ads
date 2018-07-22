const User = require('../models/user.model.js');
const payload = require('../../config/payload.config.js');
const bcrypt = require('bcryptjs')
const auth = require('./auth.controller.js')

// Verifies if request body is valid
function ValidateRequestBody(body) {
    if(!body.name) {
        return {
            valid: false,
            message: "User Name field can not be empty"
        }
    }
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

// Hash password 
function hashPassword(password){
    return bcrypt.hashSync(password, 8);
}

function getMeFromSession(req, res) {
    const auth = require('../controllers/auth.controller.js')
    return auth.getUserSession(req, res)
}

exports.getUserSession = (req, res) => {
    let user = getMeFromSession(req, res)
    if(user) {
        return res.status(400).send(payload.success(user));
    }
}

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    let isValidBody = ValidateRequestBody(req.body).valid
    if(!isValidBody) {
        return res.status(400).send({
            message: isValidBody.message
        });
    }

    // Create a User
    const user = new User({
        name: req.body.name,
        email: req.body.email, 
        password: hashPassword(req.body.password)
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(payload.success("User created successfully!"));
    }).catch(err => {
        res.status(500).send(payload.error(err.message || "Some error occurred while creating the User."));
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });
};

// Update a user identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    let isValidBody = ValidateRequestBody(req.body).valid
    if(!isValidBody) {
        return res.status(400).send({
            message: isValidBody.message
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email, 
        password: hashPassword(req.body.password)
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.id
        });
    });
};
const Privilege = require('../models/privilege.model.js');

// Create and Save a new Privilege
exports.create = (req, res) => {
    // Validate request
    if(!req.body.type) {
        return res.status(400).send({
            message: "Privilege type field can not be empty"
        });
    }
    if(!req.body.description) {
        return res.status(400).send({
            message: "Privilege description field can not be empty"
        });
    }

    // Create a Privilege
    const privilege = new Privilege({
        type: req.body.type,
        description: req.body.description || "No description",
        privilege: req.body.privilege,
        take: req.body.take || 1,
        pay: req.body.pay || 1,
        minAmount: req.body.minAmount || 0,
        priceTo: req.body.priceTo || 0
    });

    // Save Privilege in the database
    privilege.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Privilege."
        });
    });
};

// Retrieve and return all privileges from the database.
exports.findAll = (req, res) => {
    Privilege.find()
    .then(privileges => {
        res.send(privileges);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving privileges."
        });
    });
};

// Find a single privilege with a id
exports.findOne = (req, res) => {
    Privilege.findById(req.params.id)
    .then(privilege => {
        if(!privilege) {
            return res.status(404).send({
                message: "Privilege not found with id " + req.params.id
            });            
        }
        res.send(privilege);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Privilege not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving privilege with id " + req.params.id
        });
    });
};

// Update a privilege identified by the id in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.type) {
        return res.status(400).send({
            message: "Privilege type field can not be empty"
        });
    }
    if(!req.body.type) {
        return res.status(400).send({
            message: "Privilege type field can not be empty"
        });
    }

    // Find privilege and update it with the request body
    Privilege.findByIdAndUpdate(req.params.id, {
        type: req.body.type,
        description: req.body.description || "No description",
        privilege: req.body.privilege,
        take: req.body.take || 1,
        pay: req.body.pay || 1,
        minAmount: req.body.minAmount || 0,
        priceTo: req.body.priceTo || 0
    }, {new: true})
    .then(privilege => {
        if(!privilege) {
            return res.status(404).send({
                message: "Privilege not found with id " + req.params.id
            });
        }
        res.send(privilege);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Privilege not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating privilege with id " + req.params.id
        });
    });
};

// Delete a privilege with the specified id in the request
exports.delete = (req, res) => {
    Privilege.findByIdAndRemove(req.params.id)
    .then(privilege => {
        if(!privilege) {
            return res.status(404).send({
                message: "Privilege not found with id " + req.params.id
            });
        }
        res.send({message: "Privilege deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Privilege not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete privilege with id " + req.params.id
        });
    });
};
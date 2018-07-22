const User = require('../models/user.model.js');
const usersData = require('./data/users.js')

exports.seed = () => {
    console.log("Seeding users...");
    let users = usersData.value
    
    users.forEach(p => {
        let user = new User(p);
        User.findById(p._id)
        .then(found => {
            if(found){
                console.log(`User ${p.name} already inserted`)
            }
            else{
                save(user)
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                save(user)
            }
            console.log(err.message || `Some error occurred while inserting user ${p.name}`)
        });
    });
}

function save(user) {
    user.save()
    .then(data => {
        console.log(`User ${user.name} inserted.`);
    }).catch(err => {
        console.log(err.message || `Some error occurred while inserting user ${user.name}.`)
    });
}
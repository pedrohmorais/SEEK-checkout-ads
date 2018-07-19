const express = require('express');
const bodyParser = require('body-parser');
const seederProduct = require('./app/seeder/product.seeder.js');
const seederCustomer = require('./app/seeder/customer.seeder.js');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to SEEK checkout ads application."});
});

// Require Products routes
require('./app/routes/product.routes.js')(app);
require('./app/routes/privilege.routes.js')(app);
require('./app/routes/customer.routes.js')(app);

// seed database
seederProduct.seed()
seederCustomer.seed()

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});



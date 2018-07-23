const express = require('express');
const bodyParser = require('body-parser');
const seederUser = require('./app/seeder/user.seeder.js');
const seederProduct = require('./app/seeder/product.seeder.js');
const seederCustomer = require('./app/seeder/customer.seeder.js');
const seederOrder = require('./app/seeder/order.seeder.js');
const authconfig = require('./config/auth.config.js')
const session = require('express-session');
const authController = require('./app/controllers/auth.controller.js')
var cors = require('cors');


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// set cors
app.use(cors({origin: authconfig.frontUrl}));

// config session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: authconfig.secret
}))

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
require('./app/routes/auth.routes.js')(app);
require('./app/routes/product.routes.js')(app);
require('./app/routes/privilege.routes.js')(app);
require('./app/routes/customer.routes.js')(app);
require('./app/routes/order.routes.js')(app);
require('./app/routes/user.routes.js')(app);

// seed database
seederUser.seed()
seederProduct.seed()
seederCustomer.seed()
seederOrder.seed()

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});



const dotEnv = require('dotenv').load();

module.exports = {
    'secret': 'S33K_Ch3cK0uT',
    'expiresIn': 1200,
    'frontUrl': process.env.FRONT_URL
};
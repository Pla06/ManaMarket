const mongoose = require('mongoose');
const URI = 'mongodb+srv://hecmardom_db_user:dyGkaFn7LiHdVjEc@manamarket.3lsst8d.mongodb.net/ManaMarket?appName=ManaMarket';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
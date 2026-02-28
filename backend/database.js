const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || 'mongodb+srv://Mario:MarioYHéctor@cluster0.bbf5bdv.mongodb.net/ManaMarket?appName=Cluster0';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
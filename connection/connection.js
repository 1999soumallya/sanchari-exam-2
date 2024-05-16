const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => console.log('Database is successfully connected'))
db.on('disconnected', () => console.log('Database is successfully disconnected'))
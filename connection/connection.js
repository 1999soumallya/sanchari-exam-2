const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.on('connected', () => console.log('Connected to the database'));

db.on('disconnect', () => console.log('Disconnected from the database'));

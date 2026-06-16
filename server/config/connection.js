const mongoose = require('mongoose');

// Set up error handler before connecting
mongoose.connection.on('error', (err) => {
    console.warn('MongoDB connection error (server will continue):', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});

// Attempt connection but don't crash if it fails
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mhc_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
    // useCreateIndex: true,
    // useFindAndModify: false
}).catch((err) => {
    console.warn('MongoDB connection failed (server will continue):', err.message);
});

module.exports = mongoose.connection;

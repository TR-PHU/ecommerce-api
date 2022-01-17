const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://phutran:Phustran145@ecomerceproject.izzws.mongodb.net/ecomerceproject?retryWrites=true&w=majority`
        );
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failure!');
        process.exit(1);
    }
};

module.exports = connectDB;

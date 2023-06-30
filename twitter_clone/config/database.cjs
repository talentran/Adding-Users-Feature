const mongoose = require('mongoose');

const connect = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.gh5uclb.mongodb.net/`
    );

    console.log('connected to mongo');
};

module.exports = connect;
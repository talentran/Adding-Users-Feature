/* eslint-disable no-undef */
const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); 
require('./config/database.cjs');
const connect = require('./config/database.cjs');
const usersController = require('./controllers/users.cjs');

const PORT = 5000;

const { createTweet, getTweets, updateTweet, deleteTweet } = require('./controllers/tweets.cjs');

const { createUser } = require('./controllers/users.cjs');

const app = express();
app.use(express.json());

// CRUD - Create, Read, Update, Delete

// C
app.post('/tweets', createTweet);

// R
app.get('/tweets', getTweets);

// U send ID in params. Send update stuff in req.body
app.put('/tweets/:tweetId/:newTitle', updateTweet);

// D
app.delete('/tweets/:tweetId', deleteTweet);

app.post('/users', usersController.createUser);

app.listen(PORT, async () => {
    await connect();
    console.log(`server started on http://localhost:${PORT}`);
});

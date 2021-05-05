const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');

env.config();
const app = express();

app.listen(5000, () => {
    console.log('server start');
})


mongoose.connect(process.env.MDB_CONNECT_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log('connect to mongoDB');
});
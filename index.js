const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//setup express server

const app = express();

app.listen(5000, () => {
    console.log("Server start on port 5000");
});

app.use(express.json());

dotenv.config()

mongoose.connect(process.env.MDB_CONNECT_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("Connect to MongoDB");
});

app.use("/snippet", require('./routers/snippetRouter'));


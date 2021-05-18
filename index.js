const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');
const bodyParser= require('body-parser');
const cookieParser = require('cookie-parser');

env.config();
const app = express();
const corConfig = {
    origin: ['http://localhost:3000'],
    credential: true,
}
app.use(cookieParser());
app.use(cors(corConfig));

app.listen(5000, () => {
    console.log('server start');
})
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json());
// for parsing multipart/form-data
// app.use(upload.array()); 
mongoose.set('debug', true);
app.use('/users', require('./routers/userRouter'));
app.use('/login', require('./middleware/auth'),(req, res) => {
    return res.json({status: true});
});

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

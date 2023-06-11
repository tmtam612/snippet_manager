const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./models/userModel');

env.config();
const app = express();
const corConfig = {
    origin: ['http://localhost:3000'],
    credential: true,
};
app.use(cookieParser());
app.use(cors(corConfig));

app.listen(5000, () => {
    console.log('server start');
});
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
// for parsing multipart/form-data
// app.use(upload.array());
mongoose.set('debug', true);
app.use('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});
app.use('/users', require('./routers/userRouter'));
app.post('/login', async (req, res) => {
    try {
        const { user_name, password } = req.body;

        // validation

        if (!user_name || !password)
            return res.status(400).json({
                errorMessage: 'Please enter all required fields.',
            });

        // get user account

        const existingUser = await User.findOne({ user_name });
        if (!existingUser)
            return res.status(401).json({
                errorMessage: 'Wrong email or password.',
            });

        if (password != existingUser.password)
            return res.status(401).json({
                errorMessage: 'Wrong email or password.',
            });

        // create a JWT token

        const token = jwt.sign(
            {
                id: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        res.cookie('token', token, {
            httpOnly: true,
        }).send();
    } catch (err) {}
    return res.json({ status: true });
});

mongoose.connect(
    process.env.MDB_CONNECT_STRING,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err) => {
        if (err) {
            console.log(err);
            return false;
        }
        console.log('connect to mongoDB');
    }
);

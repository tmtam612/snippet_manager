const express = require("express");
const mongoose = require("mongoose");

//setup express server

const app = express();

app.listen(5000, () => {
    console.log("Server start on port 5000");
});

app.use(express.json());

// connect to mongoDB
// user: tmtam612
// password:JWcFRAZxkXyQTcGn
// connect string: mongodb+srv://tmtam612:<password>@cluster0.repew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://tmtam612:JWcFRAZxkXyQTcGn@cluster0.repew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        return console.error(err);
    }aa
    console.log("Connect to MongoDB");
});

app.use("/snippet", require('./routers/snippetRouter'));


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user_name: {type: String},
    user_id: {type: String},
    password: {type: String},
}, {
    timestamps: true
});

const User = mongoose.model("user", userSchema);

module.exports = User;
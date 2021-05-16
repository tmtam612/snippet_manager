const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: {type: String},
    user_name: {type: String},
    password: {type: String},
    image: {type: String},
    status: {type: String},  
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

userSchema.virtual('displayed_name').get(function() {
    if ((!this.first_name && !this.last_name) || (this.first_name == '' && this.last_name == '')) return ''; 
    return `${this.first_name ? this.first_name : ''} ${this.last_name ? this.last_name : ''}`;
});

userSchema.virtual('created').get(function() {
    if (!this.createdAt) return '';
    var date = new Date(this.createdAt);
    return date.toISOString().split('T')[0];
});

userSchema.virtual('modified').get(function() {
    if (!this.createdAt) return '';
    var date = new Date(this.createdAt);
    return date.toISOString().split('T')[0];
});

const User = mongoose.model("user", userSchema);

module.exports = User;
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    key: {type: String},
    value: {type: String},
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

module.exports = mongoose.model("role", roleSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ( {
    Username: {
        type : String,
        required: true
    },
    password: {
        type : String,
        required: true
    },
    Email: {
        type : String,
        required: true,
        unique: true
    }
})

module.exports = User = mongoose.model("User", userSchema );
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginUserSchema = new Schema ( {
    LoginUn: {
        type : String,
        required: true
    },
    LoginPwd: {
        type : String,
        required: true
    },
})

module.exports = LoginUser = mongoose.model("LoginUser", LoginUserSchema );
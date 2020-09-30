const mongoose = require("mongoose")

let userSchema = mongoose.Schema({
    username: String,
    img: {
        data: Buffer,
        contentType: String
    }
})

let User = mongoose.model("user", userSchema)

module.exports = {User} 
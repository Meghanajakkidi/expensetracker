const mongoose = require("mongoose")

let authSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    rePassword:String,
    role:String,
    active:Boolean,
    profilepic:String,
})

module.exports = mongoose.model("auth",authSchema)
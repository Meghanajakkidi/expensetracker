const mongoose = require("mongoose");

const ExpSchema = new mongoose.Schema({
    id: String,
    expName: String,
    expDesc: String,
    expValue: Number,  
});

module.exports = mongoose.model("exp", ExpSchema);
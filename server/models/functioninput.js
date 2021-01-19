const mongoose = require("mongoose");

//define a story schema for the database
const FunctionInputSchema = new mongoose.Schema({
    _id: Number,
    creator_name: String,
    exp: String,
    leftRange: String,
    rightRange: String,
});

// compile model from schema
module.exports = mongoose.model("func", FunctionInputSchema);

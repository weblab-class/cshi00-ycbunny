const mongoose = require("mongoose");

//define a story schema for the database
const FunctionFinishedImgSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    workId: String,
    data: Buffer,
    character: String,
});

// compile model from schema
module.exports = mongoose.model("functionFinishedImg", FunctionFinishedImgSchema);
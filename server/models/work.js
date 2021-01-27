const mongoose = require("mongoose");

//define a story schema for the database
const ImgSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    data: Buffer,
});

// compile model from schema
module.exports = mongoose.model("Img", ImgSchema);
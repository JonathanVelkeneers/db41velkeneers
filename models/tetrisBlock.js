const mongoose = require("mongoose")
const tetrisBlockSchema = mongoose.Schema({
    color: String,
    shape: String,
    numberOfSquares: Number
})
module.exports = mongoose.model("TetrisBlock", tetrisBlockSchema)
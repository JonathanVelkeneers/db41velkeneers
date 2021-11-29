const mongoose = require("mongoose")
const tetrisBlockSchema = mongoose.Schema({
    color: String,
    shape: {
        type: String,
        required: true
    },
    numberOfSquares: {
        type: Number,
        min: 0,
        max: 6
    }
})
module.exports = mongoose.model("TetrisBlock", tetrisBlockSchema)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    isImportant: {
        type: Boolean,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true    
    },
    createAt: {
        type: Number,
    }
});

module.exports = mongoose.model("Todo", todoSchema);
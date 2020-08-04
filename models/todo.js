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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true
    }
});

module.exports = mongoose.model("Todo", todoSchema);
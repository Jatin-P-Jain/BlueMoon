const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDate:{
        type: Object,
        required: true
    },
    fromTime: {
        type: String,
        required: true
    },
    toTime: {
        type: String,
        required: true
    },
    remind:{
        type:Boolean,
        required: true
    },
    taskStatus:{
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('tasks', taskSchema);
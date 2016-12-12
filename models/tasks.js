var mongoose = require('mongoose'),
    moment = require('moment'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
        ownerId: { type: String, required: true },
        taskName: { type: String, required: true },
        description: String,
        done: { type: Boolean, default: false },
        createDate: { type: Number, default: moment().unix() },
        modificationDate: { type: Number, default: moment().unix() }
    },
    {
        versionKey: false
    },
    {
        collection: 'to-do'
    });

var Task = mongoose.model('Task', taskSchema, 'to-do');

module.exports = Task; 
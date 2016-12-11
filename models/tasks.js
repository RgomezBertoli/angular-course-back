var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
        ownerId: { type: String, required: true },
        taskName: { type: String, required: true },
        done: { type: Boolean, default: false },
        createDate: { type: Date, default: Date.now },
        modificationDate: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    },
    {
        collection: 'to-do'
    });

var Task = mongoose.model('Task', taskSchema, 'to-do');

module.exports = Task; 
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
        username: { type: String, required: true, unique: true },
        pass: { type: String, required: true },
        createDate: { type: Date, default: Date.now },
        modificationDate: { type: Date, default: Date.now }
    },
    {
        versionKey: false
    },
    {
        collection: 'users'
    });

var User = mongoose.model('User', userSchema);

module.exports = User; 
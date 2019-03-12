//Exercise schema
const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

//declare schema y virtuals
const UserSchema = new Schema (
    {
        username: {type: String, required: true}
    }
);

//Virtual for User url
UserSchema
.virtual('url')
.get(function() {
    return '/api/user/' + this._id;
});

//exporting model
module.exports = mongoose.model('User', UserSchema);
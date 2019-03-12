//Exercise schema
const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

//declare schema y virtuals
const ExerciseSchema = new Schema (
    {
        uid: {type: Schema.Types.ObjectId, ref: 'User', required: true },
        desc: {type: String, required: true },
        duration: { type: String, required: true },
        date: {type: Date, required: true }
    }
);


//exporting model
module.exports = mongoose.model('Exercise', ExerciseSchema);

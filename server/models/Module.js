const mongoose = require('mongoose');


const moduleSchema = new mongoose.Schema({
    name:{type: String},
    credit:{type:Number},
    note_classe: { type: Number},
    note_exam: {type: Number},
    moyen:{type : Number},
    ueId: {
        type : mongoose.SchemaTypes.ObjectId,
        ref:'UE',
     }
});

module.exports = mongoose.model('Module', moduleSchema);
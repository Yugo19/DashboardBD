const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    note_classe: { type: Number},
    note_exam: {type: Number},
    Moyen:{type : Number}
});


module.export = mongoose.model('Note', noteSchema);
const mongoose = require('mongoose');


const bulletinSchema = new mongoose.Schema({
    nameModule:{
        type: String
    },
    semestre: {
        type : String
    },
    noteClasse: {
        type: Number
    },
    noteExam:{
        type : Number
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }
});


module.exports = mongoose.model('Bulletin', bulletinSchema);
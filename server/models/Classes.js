const mongoose = require('mongoose');


const classesSchema = new mongoose.Schema({
    name: {
        type: String
    },
    filiereId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Filiere'
    }
});

module.exports = mongoose.model('Classes', classesSchema);
const mongoose = require('mongoose');
const Module = require('./Module');

const ueSchema = new mongoose.Schema({
    name:{
        type: String
    },
    status:{
        type:String,
        enum:['Majeur', 'Mineur']
    },
    semestre:{
        type:String
    },
    filiereId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'Filiere'
    }
});

module.exports = mongoose.model('ue', ueSchema);
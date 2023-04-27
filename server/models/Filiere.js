const mongoose = require('mongoose');

const filiereSchema = new mongoose.Schema({
    name :{
        type: String
    },
});

module.exports = mongoose.model('Filiere', filiereSchema);
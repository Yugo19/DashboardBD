const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name:{
        type:String
    },
    Speciaties:{
        type:Array
    },
    email:{
        type:String
    }

})

module.exports = mongoose.model('Teacher', TeacherSchema);
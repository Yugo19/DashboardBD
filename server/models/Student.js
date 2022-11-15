const mongoose = require('mongoose');


const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone : {
        type : String,
    }
});

module.exports = mongoose.model('Student', StudentSchema);
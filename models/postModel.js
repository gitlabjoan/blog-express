/* Importing mongoose librery */
const mongoose = require('mongoose');

/* Creating the model for the DB */
const postModel = mongoose.model('postModel', {
    title: {
        type: String,
        require: true,
        trim: true
    },
    snippet: {
        type: String,
        require: true,
        trim: true
    },
    body: {
        type: String,
        require: true,
        trim: true
    }
});

/* Exporting the DB model */
module.exports = postModel;
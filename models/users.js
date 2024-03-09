const moogoose = require('mongoose')

const schema = new moogoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports = moogoose.model('Users', schema)
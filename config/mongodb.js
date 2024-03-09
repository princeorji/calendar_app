const mongoose = require('mongoose')
require('dotenv').config()

const db_url = process.env.DB_URL

function connect() {
    mongoose.connect(db_url)

    mongoose.connection.on('connected', () => {
        console.log('success')
    })

    mongoose.connection.on('error', (err) => {
        console.error('an error ocoured')
    })
}

module.exports = connect 
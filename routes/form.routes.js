const express = require('express');
const controller = require('../controllers/form')

const routes = express.Router()

routes.post('/', controller.postForm)

module.exports = routes
const path = require('path')
const express = require('express')
const cors = require('cors')

module.exports = app => {
  app.disable('x-powered-by')
  app.use(cors())
  app.use(express.static(path.join(__dirname, '../../', 'build')))
}

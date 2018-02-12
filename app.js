'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const hbs = require('express-handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('.hbs', hbs({
  defaultLayout: 'default',
  extname: 'hbs'
}))

//las rutas /api van a usar el modulo api
app.set('view engine','.hbs')

app.use('/api', api)
app.get('/login', (req, res)=>{
  res.render('login')
})

app.get('/productos', (req, res)=>{
  res.render('product')
})

module.exports = app

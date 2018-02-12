'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db,(err, res)=>{
  if(err) console.log("error conectando a la db:" + err)
  console.log("conexión a la bd establecida")
})
app.listen(config.port, () =>{
  console.log('API REST corriendo en '+ config.port)
})

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: String,
  picture: String,
  price: {type:Number, default: 0},
  category: { type: String, enum :['computers','phones', 'accesories']},
  description: String
})
//toca usar el module.exportsapra poderlo usar
module.exports = mongoose.model('Product', ProductSchema)

'use strict'

const Product = require('../models/product')

function getProduct(req, res){
  let productId = req.params.productId
  Product.findById(productId, (err, product)=>{
  if(err) return res.status(500).send({message: 'Error al realizar la petición'})
  if(!product) return res.status(404).send({message:'El producto no existe'})
  res.status(200).send({product})
  })
}

function getProducts(req, res){

    Product.find({}, (err, products)=>{
      if(err) return res.status(500).send({message: 'Error en el server'})
      if(!products) return res.status(404).send({message: 'no hay productos'})
      //console.log(products)
      res.status(200).send(products)
    })
}

function saveProduct(req, res){
  console.log('POST /API/Product')
  console.log(req.body)
  let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description
    product.save((err, productStored) =>{
      if(err) res.status(500).send({message: "Error guardando en la base de datos " + err})
      res.status(200).send({product: productStored})
    })
}

function updateProduct(req, res){
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update,  (err, productUpdate)=>{
    if(err) return res.status(500).send({message: 'Error al actualizar'})
    res.status(200).send({product: productUpdate})
  })
}

function deleteProduct(req, res){
  let productId = req.params.productId
    Product.findById(productId, (err, product)=>{
      if(err) res.status(500).send({message:'Error al borrar'})
      product.remove(err =>{
        if(err) res.status(500).send({message:'Error al borrar'})
        res.status(200).send({message: 'Producto ha sido eliminado'})
      })
    })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}

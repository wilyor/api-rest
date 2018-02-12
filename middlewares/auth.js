'use strict'
const services = require('../services')


function isAuth(req, res, next){
  if(!req.headers.authorization){
    return res.status(403).send({message: 'no tienes autorización'})
  }
  const token = req.headers.authorization.split(" ")[0]
  console.log("token inicial:"+token)
  services.decodeToken(token)
  .then(response =>{
    req.user = response
    next()
  })
  .catch(response =>{
    res.status(response.status)
  })
}

module.exports = isAuth

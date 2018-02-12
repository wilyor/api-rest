'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user){
  //datos del jwt (ver documentación)
  const payload = {
    //id del usuario
    sub: user._id,
    //cuando fue creado el token
    iat: moment().unix(),
    //expiración del token
    exp: moment().add(14, 'days').unix(),
  }
  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
//  console.log(token)
  const decoded = new Promise((resolve, reject) =>{
    try{
      const payload = jwt.decode(token, config.SECRET_TOKEN)
      if(payload.exp <= moment().unix()){
          reject( {
            status : 401,
            message: 'el token ha expirado'
          })
      }
      resolve(payload.sub)
    }catch(err){
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  })
  return decoded
}

module.exports = {
  createToken,
  decodeToken
}

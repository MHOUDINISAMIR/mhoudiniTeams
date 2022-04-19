const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //get the token
      token = req.headers.authorization.split(' ')[1]
      //verify token
      const decode = jwt.verify(token, 'token123')
      //get userId
      req.user = await User.findById(decode.id).select('-password')
      next()
    } catch (err) {
      console.log(err)
      res.status(401)
      throw new Error('NOT AUTHORIZED')
    }
  }
  if(!token){
      res.status(401)
      throw new Error('NOT AUTHORIZED')
  }
}

module.exports = protect
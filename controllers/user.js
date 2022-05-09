const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateToken = (id) => {
   return jwt.sign({ id }, 'token123', { expiresIn: '30d' })
 }

const addUser = async (req, res, next)=>{
   const {fname, lname, num ,sexe, poste, email, password, imageUrl, isAdmin, adminId}= req.body
   const createdUser = new User({
      fname, 
      lname, 
      num, 
      sexe,
      poste, 
      email, 
      password, 
      isAdmin, 
      adminId,
      imageUrl
   })

   try {
      await createdUser.save()
   } catch (err) {
      res.status(400).send(err)
   }
   res.status(201).json({ user: createdUser, token: generateToken(createdUser._id) })

}

const login = async (req, res, next) => {
   const { email, password } = req.body
   let user
   try {
     user = await User.findByCredentials(email, password, res)
   } catch (err) {
     console.log(err)
   }
 
   res.status(200).json({ message: 'loged in', email: user.email, token: generateToken(user._id) })
}

const getUsers = async (req, res, next) => {
   let users
   try {
     users = await User.find().select('-password')
   } catch (err) {
     res.status(400).send(err)
   }
 
   res.status(200).json({ users: users })
}

const getUserById = async (req, res, next) => {
   const userId = req.params.userId
   let user
   try {
     user = await User.findById(userId).select('-password')
   } catch (err) {
     res.status(400).send(err)
   }
   if (!user) {
     res.status(404).send('no user found with this Id')
   }
   res.status(200).json({ user: user })
}

const updateUser = async (req, res, next) => {
   const { fname, lname, num, sexe, poste, email, password, imageUrl } = req.body
 
   const userId = req.params.userId
 
   let user
   try {
     user = await User.findById(userId)
   } catch (err) {
     res.status(400).send(err)
   }
 
   user.fname = fname
   user.lname = lname
   user.num = num
   user.sexe = sexe
   user.poste = poste
   user.email = email
   user.password = password
   user.imageUrl = imageUrl
 
   try {
     await user.save()
   } catch (err) {
     res.status(400).send(err)
   }
 
   res.status(200).json({ message: 'updated' })
 }

 const deleteUser = async (req, res, next) => {
   const userId = req.params.userId
 
   try {
     await User.findByIdAndRemove(userId)
   } catch (err) {
     return console.log(err)
   }
 
   res.status(200).json({ message: 'deleted' })
}

exports.addUser = addUser
exports.getUsers = getUsers
exports.getUserById = getUserById
exports.updateUser = updateUser
exports.deleteUser = deleteUser
exports.login = login
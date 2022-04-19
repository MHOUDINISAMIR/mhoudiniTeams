const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')

const app = express()

app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use('/api/user', userRoutes)


mongoose.connect(
   'mongodb+srv://mhoudini_s:Mhoudini@cluster0.w8wha.mongodb.net/postApp?retryWrites=true&w=majority'
 ).then((result) => {
     app.listen(5000)
     console.log('mongoDB connected')
 }).catch((err) => {
     console.log(err)
 })
const express = require('express')
const userControllers = require('../controllers/user')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/add-user', userControllers.addUser)
router.post('/login', userControllers.login)
router.get('/users', protect, userControllers.getUsers)
router.get('/:userId', protect, userControllers.getUserById)
router.put('/update/:userId', protect, userControllers.updateUser)
router.delete('/delete/:userId', protect, userControllers.deleteUser)

module.exports = router
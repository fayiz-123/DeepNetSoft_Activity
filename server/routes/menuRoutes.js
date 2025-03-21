const express = require('express')
const menuRoutes = express.Router()
const menuController = require('../controllers/menuController')

menuRoutes.post('/addMenu',menuController.addMenu)
menuRoutes.get('/allMenus',menuController.allMenus)
menuRoutes.get('/menu/:id',menuController.menu)
menuRoutes.put('/updateMenu/:id',menuController.updateMenu)
menuRoutes.delete('/deleteMenu/:id',menuController.deleteMenu)

module.exports = menuRoutes;
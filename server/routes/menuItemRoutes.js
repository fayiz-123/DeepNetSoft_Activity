const express = require('express')
const menuItemRoutes = express.Router()
const menuItemController = require('../controllers/menuItemController')

menuItemRoutes.post('/addMenuItem/:menuId',menuItemController.addMenuItem)
menuItemRoutes.get('/allMenuItems/:menuId',menuItemController.allMenuItemsOfMenu)
menuItemRoutes.get('/menu-items/:menuId',menuItemController.menuItem)
menuItemRoutes.get('/item/:menuItemId',menuItemController.getMenuItem)
menuItemRoutes.put('/updateMenuItem/:menuItemId',menuItemController.updateMenuItem)
menuItemRoutes.delete('/deleteItem/:menuItemId',menuItemController.deleteMenuItem)

module.exports = menuItemRoutes;
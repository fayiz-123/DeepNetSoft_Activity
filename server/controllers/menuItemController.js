const MenuItem = require('../models/menuItemsModel')
const Menu = require('../models/menuModel');
const { updateMenu } = require('./menuController');

async function addMenuItem(req,res) {
        try {
            const{menuId}= req.params;
            const {name,description,price} = req.body;
            const menu = await Menu.findById(menuId)
            if(!menu){
                return res.status(400).json({success:false,message:"Menu not found"})
            }
            const newMenuItem = new MenuItem({
                name:name,
                description:description,
                price:price,
                menu:menuId
            })
            const savedMenuItem = await newMenuItem.save()
            menu.items.push(savedMenuItem._id)
            await menu.save()
            res.status(200).json({success:true,savedMenuItem})       
            
        } catch (error) {
            res.status(500).json({success:false,message:error.message})
        }
    
}

async function allMenuItemsOfMenu(req,res) {
    try {
        const {menuId} = req.params;
        const allMenuItemsOfMenu = await Menu.findById(menuId).populate('items')
        if(!allMenuItemsOfMenu){
            return res.status(400).json({success:false,message:"Menu Not Found"})
        }
        res.status(200).json({success:true,allMenuItemsOfMenu})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }   
}


async function menuItem(req,res) {
    try {
        const {menuId} = req.params;
        const menuItemOfMenu = await Menu.findById(menuId).populate('items');
        if(!menuItemOfMenu){
           return res.status(400).json({success:false,message:"Menu not Found"})
        }
        return res.status(200).json({success:true,menuItemOfMenu})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

async function getMenuItem(req,res) {
    try {
        const {menuItemId} = req.params
        const findItem = await MenuItem.findById(menuItemId)
        if(!findItem){
           return res.status(400).json({success:false,message:"Item not found"})
        }
        res.status(200).json({success:true,findItem})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

async function updateMenuItem(req,res) {
     try {
        const {menuItemId}= req.params;
        const {name,description,price}= req.body
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(menuItemId,
            {name,description,price},
            {new:true}
        )
        if(!updatedMenuItem){
           return res.status(400).json({success:false,message:"MenuItem Not updated"})
        }
        return res.status(200).json({success:true,updatedMenuItem})
       } catch (error) {
        res.status(500).json({success:false,message:error.message})
       } 
    }

async function deleteMenuItem(req,res) {
    try {
        const {menuItemId} = req.params;
        const findMenuItem = await MenuItem.findById(menuItemId)
        if(!findMenuItem){
            return res.status(400).json({success:false,message:"MenuItem not found"})
        }
        await MenuItem.findByIdAndDelete(menuItemId)
        await Menu.findByIdAndUpdate(findMenuItem.menu,{$pull:{items:menuItemId}}) 
        return res.status(200).json({success:true,message:"Menu deleted Succesfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports={
    addMenuItem,
    allMenuItemsOfMenu,
    menuItem,
    getMenuItem,
    updateMenuItem,
    deleteMenuItem
}
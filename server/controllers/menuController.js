const Menu = require('../models/menuModel')

async function addMenu(req,res) {
    try {
        const {name,description} = req.body
        const newMenu = new Menu({
            name:name,
            description:description
        })
        const savedMenu = await newMenu.save()
        res.status(200).json({success:true,savedMenu})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

async function allMenus(req,res) {
    try {
        const allMenus = await Menu.find()
        if(!allMenus){
         res.status(400).json({success:false,message:"no menus found"})
        } 
        res.status(200).json({success:true,allMenus})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
  
}

async function menu(req,res) {
    try {
        const {id} = req.params;
        const findMenu = await Menu.findById(id)
        if(!findMenu){
           return res.status(400).json({success:false,message:"Menu not found"})
        }
        res.status(200).json({success:true,findMenu})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

async function updateMenu(req,res) {
   try {
    const {id}= req.params;
    const {name,description}= req.body
    const updatedMenu = await Menu.findByIdAndUpdate(id,
        {name,description},
        {new:true}
    )
    if(!updatedMenu){
       return res.status(400).json({success:false,message:"Menu Not updated"})
    }
    res.status(200).json({success:true,updatedMenu})
   } catch (error) {
    res.status(500).json({success:false,message:error.message})
   } 
}

async function deleteMenu(req,res) {
    try {
        const {id} = req.params;
        const deleteMenu = await Menu.findByIdAndDelete(id)
        if(!deleteMenu){
            res.status(400).json({success:false,message:"menu not deleted"})
        }
        res.status(200).json({success:true,message:"Menu deleted Succesfully"})
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
}

module.exports={
    addMenu,
    allMenus,
    menu,
    updateMenu,
    deleteMenu
}
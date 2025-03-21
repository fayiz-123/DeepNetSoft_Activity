import React from "react"
import MenuPage from "./pages/MenuPage"
import {Route,Routes} from 'react-router-dom'
import AddMenu from "./pages/AddMenu"
import UpdateDeleteMenuPage from "./pages/UpdateDeleteMenuPage"






function App() {
  

  return (
    <>
    <Routes>
     <Route path="/" element={<MenuPage/>} />
     <Route path="/add-menu" element={<AddMenu/>} />
     <Route path="/menu/:menuId/update" element={<UpdateDeleteMenuPage/>} />
    </Routes>
   
    </>
  )
}

export default App

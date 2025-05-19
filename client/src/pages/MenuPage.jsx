import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MenuPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [menuItems, setMenuItems] = useState([]); 
  const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseApiUrl}/allMenus`);
        if (response.data.success) {
          setCategories(response.data.allMenus);

          
          if (response.data.allMenus.length > 0) {
            const firstMenuId = response.data.allMenus[0]._id;
            setSelectedCategory(firstMenuId); 
            fetchMenuItems(firstMenuId); 
          }
        } else {
          alert("Failed to load categories.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Error fetching categories.");
      }
    };

    fetchCategories();
  }, []);


  const fetchMenuItems = async (menuId) => {
    try {
      const response = await axios.get(`${baseApiUrl}/menuItem/allMenuItems/${menuId}`);
      if (response.data.success) {
        setMenuItems(response.data.allMenuItemsOfMenu.items); 
      } else {
        alert("Failed to load menu items.");
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
      alert("Error fetching menu items.");
    }
  };

  const handleCategoryClick = (menuId) => {
    setSelectedCategory(menuId); 
    fetchMenuItems(menuId); 
  };

  return (
    <>
      <Navbar />
      <section className="middle-section">
        <div className="hero-section">
          <h1 className="menu-title">MENU</h1>
          <p className="menu-description">
            Please take a look at our menu featuring food, drinks, and brunch.
            If you'd like to place an order, use the "Order Online" button below.
          </p>
        </div>
  
        <div className="menu-categories">
          {categories.map((menu) => (
            <button
              key={menu._id}
              className={`category-btn ${selectedCategory === menu._id ? "selected" : ""}`} 
              onClick={() => handleCategoryClick(menu._id)} 
            >
              {menu.name}
            </button>
          ))}
          <Link to="/add-menu">
            <button className="category-btn add-menu-btn">
              <u>Add Menu</u>
            </button>
          </Link>
          
          <Link to={`/menu/${selectedCategory}/update`}>
            <button className="category-btn update-menu-btn">
              <u>Update Menu</u>
            </button>
          </Link>
        </div>

     
        <div className="cocktails-section">
          {selectedCategory && (
            <>
              <h2 className="cocktails-title">
                {categories.find((cat) => cat._id === selectedCategory)?.name} Menu
              </h2>
              {menuItems.length === 0 ? (
                <p>No menu items available for this category.</p>
              ) : (
                menuItems.map((item) => (
                  <div key={item._id} className="cocktail-item">
                    <p className="cocktail-name">{item.name}</p>
                    <p className="cocktail-price">₹{item.price}</p>
                    <p className="cocktail-description">{item.description}</p>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default MenuPage;

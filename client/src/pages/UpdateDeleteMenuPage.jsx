import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function UpdateDeleteMenuPage() {
  const { menuId } = useParams();
  const navigate = useNavigate();

  const [menu, setMenu] = useState({
    name: "",
    description: "",
  });
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/menu/${menuId}`);
        if (response.data.success) {
          setMenu(response.data.findMenu);
        } else {
          alert("Failed to load menu.");
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
        alert("Error fetching menu.");
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/menuItem/menu-items/${menuId}`);
        if (response.data.success) {
          setMenuItems(response.data.menuItemOfMenu.items);
        } else {
          alert("Failed to load menu items.");
        }
      } catch (error) {
        console.error("Error fetching menu items:", error);
        alert("Error fetching menu items.");
      }
    };

    fetchMenu();
    fetchMenuItems();
  }, [menuId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/updateMenu/${menuId}`, menu);
      if (response.data.success) {
        alert("Menu updated successfully!");
        navigate("/"); 
      } else {
        alert("Failed to update menu.");
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Error updating menu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMenuItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/menuItem/deleteItem/${itemId}`);
        if (response.data.success) {
          alert("Menu item deleted successfully!");
          
          const updatedItemsResponse = await axios.get(`http://localhost:5000/menuItem/menu-items/${menuId}`);
          if (updatedItemsResponse.data.success) {
            setMenuItems(updatedItemsResponse.data.menuItemOfMenu.items);
          } else {
            alert("Failed to fetch updated menu items.");
          }
        } else {
          alert("Failed to delete menu item.");
        }
      } catch (error) {
        console.error("Error deleting menu item:", error);
        alert("Error deleting menu item.");
      }
    }
  };

  const handleDeleteMenu = async () => {
    if (window.confirm("Are you sure you want to delete this menu? This action cannot be undone.")) {
      try {
        const response = await axios.delete(`http://localhost:5000/deleteMenu/${menuId}`);
        if (response.data.success) {
          alert("Menu deleted successfully!");
          navigate("/"); 
        } else {
          alert("Failed to delete menu.");
        }
      } catch (error) {
        console.error("Error deleting menu:", error);
        alert("Error deleting menu.");
      }
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/menuItem/addMenuItem/${menuId}`, newItem);
      if (response.data.success) {
        alert("Menu item added successfully!");
        const updatedItemsResponse = await axios.get(`http://localhost:5000/menuItem/menu-items/${menuId}`);
        if (updatedItemsResponse.data.success) {
          setMenuItems(updatedItemsResponse.data.menuItemOfMenu.items);
        } else {
          alert("Failed to fetch updated menu items.");
        }
        setShowAddItemForm(false);
        setNewItem({
          name: "",
          description: "",
          price: "",
        });
      } else {
        alert("Failed to add menu item.");
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("Error adding menu item.");
    }
  };

  const handleEditMenuItem = (item) => {
    setEditItem(item); 
  };

  const handleUpdateMenuItem = async (e) => {
    e.preventDefault();
    if (!editItem) return;

    try {
      const response = await axios.put(`http://localhost:5000/menuItem/updateMenuItem/${editItem._id}`, editItem);
      if (response.data.success) {
        alert("Menu item updated successfully!");
        const updatedItemsResponse = await axios.get(`http://localhost:5000/menuItem/menu-items/${menuId}`);
        if (updatedItemsResponse.data.success) {
          setMenuItems(updatedItemsResponse.data.menuItemOfMenu.items);
        } else {
          alert("Failed to fetch updated menu items.");
        }
        setEditItem(null); 
      } else {
        alert("Failed to update menu item.");
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
      alert("Error updating menu item.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Update Menu</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ textAlign: "left", marginBottom: "5px", fontWeight: "bold", color: "#00aaff" }}>Menu Name:</label>
        <input
          type="text"
          name="name"
          value={menu.name}
          onChange={(e) => setMenu({ ...menu, name: e.target.value })}
          required
          style={{
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />

        <label style={{ textAlign: "left", marginBottom: "5px", fontWeight: "bold", color: "#00aaff" }}>Description:</label>
        <textarea
          name="description"
          value={menu.description}
          onChange={(e) => setMenu({ ...menu, description: e.target.value })}
          required
          style={{
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
            height: "80px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "0.3s",
            fontSize: "16px",
          }}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Menu"}
        </button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h3>Menu Items</h3>
        {menuItems.length === 0 ? (
          <p>No menu items found. Add some items!</p>
        ) : (
          menuItems.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                backgroundColor: "rgb(0, 123, 255)",
                borderRadius: "5px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <p>Price: ₹{item.price}</p>
              </div>
              <button
                onClick={() => handleEditMenuItem(item)}
                style={{
                  background: "#ffc107",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteMenuItem(item._id)}
                style={{
                  background: "#dc3545",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}

        {/* Add New Item Button */}
        {!editItem && (
          <button
            onClick={() => setShowAddItemForm(true)}
            style={{
              marginTop: "20px",
              padding: "10px 15px",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add New Item
          </button>
        )}

        {/* Add New Item Form */}
        {showAddItemForm && (
          <form onSubmit={handleAddMenuItem} style={{ marginTop: "20px" }}>
            <h4>Add Menu Item</h4>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              placeholder="Item Name"
              style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
              required
            />
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              placeholder="Description"
              style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
              required
            />
            <input
              type="number"
              name="price"
              value={newItem.price}
              onChange={handleChange}
              placeholder="Price"
              style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add Item
            </button>
          </form>
        )}

        {/* Edit Menu Item Form */}
        {editItem && (
          <form onSubmit={handleUpdateMenuItem} style={{ marginTop: "20px" }}>
            <h4>Edit Menu Item</h4>
            <input
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleEditChange}
              placeholder="Item Name"
              style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
              required
            />
            <textarea
              name="description"
              value={editItem.description}
              onChange={handleEditChange}
              placeholder="Description"
              style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
              required
            />
            <input
              type="number"
              name="price"
              value={editItem.price}
              onChange={handleEditChange}
              placeholder="Price"
              style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Update Item
            </button>
          </form>
        )}

        {/* Delete Menu Button */}
        <button
          onClick={handleDeleteMenu}
          style={{
            marginTop: "20px",
            padding: "10px 15px",
            background: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Delete Menu
        </button>
      </div>
     <div style={{paddingTop:"10px"}}><Link to="/"> <button style={{backgroundColor:"#007bff",fontSize:"20px", color:"white",borderRadius:"5px"}}>Completed</button></Link></div>
    </div>
  );
}

export default UpdateDeleteMenuPage;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddMenu() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://deepnetsoft-activity-deployment.onrender.com/addMenu", {
        name,
        description,
      });

      if (response.data.success) {
        alert("Menu added successfully!");
        navigate("/");
      } else {
        alert("Failed to add menu.");
      }
    } catch (error) {
      console.error("Error adding menu:", error);
      alert("Error adding menu.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333" }}>Add New Menu</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ textAlign: "left", marginBottom: "5px", fontWeight: "bold",  color:"#00aaff"}}>Menu Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "100%",
          }}
        />

        <label style={{ textAlign: "left", marginBottom: "5px", fontWeight: "bold",color:"#00aaff" }}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        >
          Add Menu
        </button>
      </form>
    </div>
  );
}

export default AddMenu;

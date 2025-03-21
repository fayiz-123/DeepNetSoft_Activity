import React, { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src="/images/Logo.png" alt="logo" className="logo-image" />
        <div className="logo-text">
          Deep <span className="net">Net</span>
          <br />
          <span className="soft">Soft</span>
        </div>
      </div>

      {/* Hamburger Menu Button */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        &#9776;  {/* Unicode for three lines (☰) */}
      </div>

     
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Menu</a></li>
        <li><a href="#">Make a reservation</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

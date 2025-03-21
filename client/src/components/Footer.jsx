import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-box">
          <h3>CONNECT WITH US</h3>
          <p>📞 +91 9561843340</p>
          <p>✉️ info@deepnetsoft.com</p>
        </div>

        <div className="footer-box center">
          <img src="/images/Logo.png" alt="Deep Net Soft" className="footer-logo" />
          <h2 className="footer-title">
            DEEP <span className="net">NET</span> <span className="soft">SOFT</span>
          </h2>
        </div>

        <div className="footer-box">
          <h3>FIND US</h3>
          <p>First floor, Geo Infopark, Infopark EXPY, Kakkanad</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Deepnetsoft Solutions. All rights reserved.</p>
        <div>
          <a href="/terms">Terms & Conditions</a> | <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

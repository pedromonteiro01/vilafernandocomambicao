import React from "react";
import footer from "./footer.png";
import "./Footer.css"; // import css file

const Footer = () => {
  return (
    <footer className="footer">
      <img 
        src={footer} 
        alt="Footer Logo" 
        className="footer-image" 
      />
    </footer>
  );
};

export default Footer;

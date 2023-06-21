import React from 'react'
import "./footer.css"

export const Footer = () => {
  return (
    <div>
        <footer className="footer">
      <div className="footer_section">
        <h2 className="footer_section-title">Address</h2>
        <p className="footer_section-text">
          Hamra Street Above Antoine Library 2nd floor
        </p>
      </div>
      <div className="footer_section">
        <h2 className="footer_section-title">Contact Information</h2>
        <p className="footer_section-text">
          hadi.hassoun.03@gmail.com
          </p>
          <p className="footer_section-text"> 
          +961 01 85 78 96
          </p>
          <p className="footer_section-text">
          +961 70 99 65 58
        </p>
      </div>
    </footer>
    </div>
  )
}

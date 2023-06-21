import React, { useState } from "react";
import {
  FaUserFriends,
  FaEnvelope,
  FaSearch,
  FaUser,
  FaCreditCard,
} from "react-icons/fa";
import "../components/navbar/nav.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';
import { FaVideo } from 'react-icons/fa';


const NavHome = () => {
  const accountid=localStorage.getItem('AccountID')
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
    navigate('/');

  }
  function handleSearch(e) {
    e.preventDefault();
     localStorage.setItem("search", searchText);
     navigate('/searchmem');
  }

  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <a href="/home" className="navbar__link">
            <span className="navbar__text">Home</span>
          </a>
        </li>

        <li className="hide-sm navbar__item">
          <a href="/aumem" className="navbar__link">
            <span className="navbar__text">About Us</span>
          </a>
        </li>
        <li className="hide-sm navbar__item">
          <a href="/cmem" className="navbar__link">
            <span className="navbar__text">Contact Us</span>
          </a>
        </li>

        <li className="hide-sm navbar__item">
          <form className="navbar__form">
              <input
                type="text"
                placeholder="Search..."
                className="navbar__input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="navbar__button" onClick={handleSearch}>
                <FaSearch className="navbar__search-icon" />
              </button>
          </form>
        </li>

        <li className="navbar__item">
          <a href="/conmem" className="navbar__link">
            <FaUserFriends className="navbar__icon" />
          </a>
        </li>

        <li className="navbar__item">
          <a href="/chatmem" className="navbar__link">
            <FaEnvelope className="navbar__icon" />
          </a>
        </li>

        <li className="hide-sm navbar__item">
          <a href="/videomem" className="navbar__link">
            <FaVideo className="navbar__icon" />
          </a>
        </li>

        

        <li className="navbar__item">
          <a href="/paymem" className="navbar__link">
            <FaCreditCard className="navbar__icon" />
          </a>
        </li>

        <li className="navbar__item">
          <a href={`/promem/${accountid}`} className="navbar__link">
            <FaUser className="navbar__icon" />
          </a>
        </li>
        <li className="hidesm navbar__item">
          <div className="navbar__link" style={{background:"none"}} onClick={logout}>
            <FiLogOut className="navbar__icon"/>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavHome;

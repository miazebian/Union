import React, {useState} from "react";
import { FaUserFriends, FaEnvelope, FaSearch, FaUser, FaVideo} from "react-icons/fa";
import "../components/navbar/nav.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';


const NavJud = () => {
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
     navigate('/searchjud');
  }
  return (
    <nav className="navbar">
      <ul className="navbar__list">
        <li className="navbar__item">
          <a href="/homejud" className="navbar__link">
            <span className="navbar__text">Home</span>
          </a>
        </li>

        <li className="hide-sm navbar__item">
          <a href="/aujud" className="navbar__link">
            <span className="navbar__text">About Us</span>
          </a>
        </li>
        <li className="hide-sm navbar__item">
          <a href="/Cjud" className="navbar__link">
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
            <button type="submit" className="navbar__button" onClick={handleSearch} >
              <FaSearch className="navbar__search-icon" />
            </button>
          </form>
        </li>

        <li className="navbar__item">
          <a href="/conjud" className="navbar__link">
            <FaUserFriends className="navbar__icon" />
          </a>
        </li>

        <li className="navbar__item">
          <a href="/chatjud" className="navbar__link">
            <FaEnvelope className="navbar__icon" />
          </a>
        </li>

        <li className="hide-sm navbar__item">
          <a href="/videojud" className="navbar__link">
            <FaVideo className="navbar__icon" />
          </a>
        </li>

        <li className="navbar__item">
          <a href={`/projud/${accountid}`} className="navbar__link">
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

export default NavJud;

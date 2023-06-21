import React from 'react'
import "./co.css"
import {useNavigate, useLocation } from 'react-router-dom';


export const Co = () => {
  const location = useLocation();
  const { username,email,password } = location.state || {};
  console.log("From CO Page");
  console.log(username,email,password);
  let Accountype = -1;
  const navigate = useNavigate();

  const nav1 = () => {
    Accountype = 3;
    navigate('/wit',{state: { username, email, password, Accountype }});
  };
  const nav2 = () => {
    Accountype = 2;
    navigate('/judge',{state: { username, email, password, Accountype }});
  };  
  const nav3 = () => {
    Accountype = 1;
    navigate('/mem',{state: { username, email, password, Accountype }});
  };
  document.body.style.backgroundColor = "#404040";

  return (

    <div className='all'>
      <h1 className='h'>Choose the type of account you want</h1>
      
      <button className="but" type="submit" onClick={nav3}>
        Member
      </button>
      <button className='but' type="submit" onClick={nav1}>
        Witness
      </button>
      <button className='but' type="submit" onClick={nav2}>
        Judge
      </button>
      </div>
  )
}

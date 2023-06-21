import React, {useState} from 'react'
import SplitScreen from './split/splitSc';
import './login.css';
import { BsXCircleFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


export const Login = () => {
    const [popupStyle, showPopup] = useState("hide")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const handleSubmit =(e) =>
    {
      e.preventDefault();
      fetch("http://localhost:5300/api/auth/login",{
        method:"POST",
        crossDomain: true,
        headers:{
          "Content-Type":"application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify({
          username,
          password
        })
      }).then((res) => {
      if (res.ok && res.status === 201) {
            res.json().then((data) => {
                const UserID = data.user._id;
               
                if(data.Accountype === 1)
                {
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("userID", UserID);
                  localStorage.setItem("Accountype", data.Accountype);
                  localStorage.setItem("First", data.user.FirstName);
                  localStorage.setItem("Middle", data.user.MiddleName);
                  localStorage.setItem("Last", data.user.LastName);
                  localStorage.setItem("DOB", data.user.DateOfBirth);
                  localStorage.setItem("Gender",data.user.Gender);
                  localStorage.setItem("Country", data.user.Country_of_Origin);
                  localStorage.setItem("Marital", data.user.Marital_Status);
                  localStorage.setItem("AccountID",data.user.AccountID);
                  navigate('/home');
                }else if(data.Accountype === 2)
                {
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("userID", UserID);
                  localStorage.setItem("Accountype", data.Accountype);
                  localStorage.setItem("First", data.user.FirstName);
                  localStorage.setItem("Middle", data.user.MiddleName);
                  localStorage.setItem("Last", data.user.LastName);
                  localStorage.setItem("DOB", data.user.DateOfBirth);
                  localStorage.setItem("Gender",data.user.Gender);
                  localStorage.setItem("Country", data.user.Country_of_Origin);
                  localStorage.setItem("Marital", data.user.Marital_Status);
                  localStorage.setItem("AccountID",data.user.AccountID);
                  navigate('/homejud');
                }
                else if(data.Accountype === 3)
                {
                  localStorage.setItem("token", data.token);
                  localStorage.setItem("userID", UserID);
                  localStorage.setItem("Accountype", data.Accountype);
                  localStorage.setItem("First", data.user.FirstName);
                  localStorage.setItem("Middle", data.user.MiddleName);
                  localStorage.setItem("Last", data.user.LastName);
                  localStorage.setItem("DOB", data.user.DateOfBirth);
                  localStorage.setItem("Gender",data.user.Gender);
                  localStorage.setItem("Country", data.user.Country_of_Origin);
                  localStorage.setItem("Marital", data.user.Marital_Status);
                  localStorage.setItem("AccountID",data.user.AccountID);
                  navigate('/homewit');
                }
                
            });
        } else {
            popup();
            return;
        }
    })
    }
    function closeItem(e) {
      e.preventDefault();
      setActive(false);
      showPopup("hide");
    }
    function openItem() {
      setActive(false);
    }
    const style = { color: "#b2cdd8", fontSize:'1.5em'}

    const popup = () => {
        showPopup("login-popup")
        openItem();
    }
  return (
    <div>
        <SplitScreen
            leftPane={(
                <div>
                </div>
            )}
            
            rightPane={(
              <form className='cover2' onSubmit={handleSubmit}>
            <div className='cover'>
                <h1>Welcome back!</h1>
                <h1>Login</h1>
                
                <label className='label'>Username  </label>

                <input htmlFor="username" className="input" type="text" placeholder="user123" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}/>
              
               <label className='label' >Password</label>
                <input htmlFor="password" className='input'   type="password" placeholder="u1234!" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                
                <button type='submit' className='submit'>Login</button>
                <p className='create'>
                    <NavLink to="/sign">Create an account!</NavLink>
                  </p>
                  
                    <div className={popupStyle}>
                    
                    <button className='button' onClick={closeItem}>
                    <BsXCircleFill style={style}/>
                    </button>
                    <div className='talk'>     <h3>Login Failed</h3>
                <p>Username or Password incorrect</p>
                </div>
            </div>
            </div>
            </form>
            )}
        />  
    </div>
  )
}

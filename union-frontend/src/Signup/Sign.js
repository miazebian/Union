import React, {useState} from 'react'
import SplitScreen from '../login/split/splitSc';
import '../login/login.css';
import { BsXCircleFill } from 'react-icons/bs';
import { NavLink,useNavigate,Link } from 'react-router-dom';



export const Sign = () => {
    const [popupStyle, showPopup] = useState("hide");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //handleSubmit = handleSubmit.bind()
    
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const nav1 = () => {
      navigate('/Co');
    };
    function closeItem() {
      setActive(true);
      showPopup("hide");
    }
    function openItem() {
      setActive(false);
    }
    const handleSubmit = (event) => {
      event.preventDefault();
      // Pass the form data to the other page through the Link component
      navigate('/Co',{ state: { username, email, password } });
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
              <form className = 'cover2' onSubmit = {handleSubmit}>
            <div className='cover'>
                <h1>Welcome To Union!</h1>
                <h1>Sign Up</h1>
                <label className='label'>Enter Username</label>

                <input
                className='input'
                type="username"
                placeholder="Enter a username"
                name="username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <label className='label1'>Enter Email</label>
              <input
                className='input'
                type="email"
                placeholder="Enter an email"
                name="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='label'>Enter Password</label>
              <input
                className='input'
                type="password"
                placeholder="Enter a password"
                name="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
               
                <button type='submit' className='submit' 
                >
                  SignUp</button>
                <p className='create'>
                    <NavLink to="/">Already have an account! Login</NavLink></p>

                    <div className={popupStyle}>
                    
                    <button className='button'
                  onClick={closeItem}>
                    <BsXCircleFill style={style}/>
                    </button>
                    
           <div className='talk'>     
           <h3>SignUp Failed</h3>
                <p>Username or email already exists</p>
                </div>
            </div>
            </div>
            </form> 
            
            )}
        />
    </div>
  )
}
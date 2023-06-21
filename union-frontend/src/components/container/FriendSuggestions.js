import PropTypes from 'prop-types';
import "./FriendSuggestion.css";
import { useNavigate } from 'react-router-dom';
import StarRating from '../profilepic/StarRating';
import { useState } from 'react';
import Alt from '../../img/ring1.jpg';

function FriendSuggestion({page, accountid, profileImgSrc, name, Country, type, rating}) {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('AccountID');
  const [con, setcon]=useState("Checking");
  const navigate = useNavigate();
  if(profileImgSrc===undefined){
    profileImgSrc=Alt;
  }
  async function remove() {
    if(accountid!==undefined){
    const response = await fetch(`http://localhost:5300/api/Connection/delete_double/${accountid}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

    });
    const data = await response.json();

    console.log(data);
    //window.location.reload(true);
  }
}



  function checkremove(){
    if(page==="connect"){
      return (
<div className='btn-cont1' onClick={remove}>
          <button className='button3'>Remove</button>
          </div>
      );
    }
  }

  function nav(){
    navigate(`/promem/${accountid}`);
  }

  const style = {
    background: "linear-gradient(to right, #fed5cf 30% , #b2cdd8 70%",
  };

  function t(){
    if(type===3){
      return "Witness"
    }
    if(type===1){
      return "Member"
    }
    if(type===2){
      return "Judge"
    }
  }
  const promise1 = Promise.resolve('1');

  const promise2 = Promise.resolve('0');

 {/*
  const addConnectionion = async (event) => {
    if(event.target.value==="Add Connection"){
      //console.log(event.target.value);

    if(accountid!==undefined){
    const response = await fetch(`http://localhost:5300/api/Connection/createConnection/${id}/${accountid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    console.log(name+" "+accountid);
    console.log(data);
    return (data.message);
  }
}
}


*/}
  return (
    
    <div style={style} className='cn' >
    <div className="friend-suggestion-container">
      <div className="friend-list">
        <div className="friend-suggestion">
          <img src={profileImgSrc} alt='Profile' />
          <div className='labelcont' onClick={nav} >
            <h3>{name}</h3>
            <h4>{t()}</h4>
            <span className='span1' >{Country}</span>
            <p></p>
            <StarRating rating={rating}/>

          </div>
          <div className='btn-cont'>
          
          {checkremove()}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

FriendSuggestion.propTypes = {
  profileImgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Country: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  
};
function FriendSuggestions({ friendList, page }) {
  return (
    <div className="friend-suggestion-container">
      
      <div className="friend-list">
       {friendList.map((friend) => (
        
          <FriendSuggestion page={page} rating={friend.OverAllRating} accountid={friend.AccountID}  profileImgSrc={friend.Profile_Picture} name={friend.FirstName+" "+friend.LastName} Country={friend.Country_of_Origin} type={friend.Accountype} />
        ))}
      </div>
    </div>
  );
}

FriendSuggestions.propTypes = {
  friendList: PropTypes.arrayOf(PropTypes.shape({
    profileImgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    Country: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  })).isRequired,
};

export default FriendSuggestions;
import PropTypes from 'prop-types';
import "../container/FriendSuggestion.css";
import StarRating from '../profilepic/StarRating';
import { useNavigate } from 'react-router-dom';
import Alt from '../../img/ring1.jpg'
function FriendSuggestion({accountid, profileImgSrc, name, Country, type, rating}) {
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('AccountID');
  const navigate = useNavigate();
  if(profileImgSrc===undefined){
    profileImgSrc=Alt;
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
    async function accept() {
    if (accountid !== undefined) {
      fetch(`http://localhost:5300/api/Connection/updateConnection/${id}/${accountid}`, {
      method:"PUT",  
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
          return res.json();
        })
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
        });
    }
  }

  async function remove() {
    if (accountid !== undefined) {
      fetch(`http://localhost:5300/api/Connection/delete_double/${id}/${accountid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
          return res.json();
        })
        .then((data) => console.log(data))
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  return (
    
    <div style={style} className='cn'>
    <div className="friend-suggestion-container">
      <div className="friend-list">
        <div className="friend-suggestion">
          <img src={profileImgSrc} alt="Profile" />
          <div className='labelcont' onClick={nav} >
            <h3>{name}</h3>
            <h4>{t()}</h4>
            <span>{Country}</span>
            <p></p>
            <StarRating rating={rating}/>
          </div>
          <div className='btn-cont'>
          <div className='btn-cont1' onClick={accept} >
          <button className='button1' >Accept</button>
         </div> 
         <div className='btn-cont1' onClick={remove}>
          <button className='button2'>Reject</button></div>
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

function AccDec({ friendList, refreshData }) {
  return (
    <div className="friend-suggestion-container">
      <div className="friend-list">
        {friendList.map((friend) => (
          <FriendSuggestion rating={friend.OverAllRatingS} key={friend.AccountID} accountid={friend.AccountID} profileImgSrc={friend.Profile_Picture} name={friend.FirstName+" "+friend.LastName} Country={friend.Country_of_Origin} type={friend.type} />
        ))}
      </div>
    </div>
  );
}

AccDec.propTypes = {
  friendList: PropTypes.arrayOf(PropTypes.shape({
    profileImgSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    Country: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  connect:PropTypes.string.isRequired,  })).isRequired,
};

export default AccDec;

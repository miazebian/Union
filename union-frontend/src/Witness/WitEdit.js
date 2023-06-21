import React, { useState, useEffect } from "react";
import "../Signup/info/infos.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import NavWit from "./NavWit";
import profileImgSrc from '../img/ring1.jpg';
import { BsXCircleFill } from 'react-icons/bs';
import { format } from 'date-fns'
import Alt from '../img/ring1.jpg';
import axios from "axios";

const WitEdit = () => {
  document.body.style.backgroundColor = "white";
  const [popupStyle, showPopup] = useState("hide")
  const [active, setActive] = useState(false);
  const First = localStorage.getItem("First");
  const Middle = localStorage.getItem("Middle");
  const Last = localStorage.getItem("Last");
  const DOB = localStorage.getItem("DOB");
  const dob = format(new Date(DOB), 'yyyy-MM-dd');
  const Gender = localStorage.getItem("Gender");
  const Marital = localStorage.getItem("Marital");
  const Country = localStorage.getItem("Country");

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
      showPopup("popup")
      openItem();
  }
  const handleFileChange = (e) => {
    if(e.target.files[0]){
      setProfile(e.target.files[0]);
    }
  }

  const [firstName, setFirstName] = useState(First);
  const [middleName, setMiddleName] = useState(Middle);
  const [lastName, setLastName] = useState(Last);
  const [dateOfBirth, setDateOfBirth] = useState(dob);
  const [gender, setGender] = useState(Gender);
  const [selectedCountry, setSelectedCountry] = useState(Country);
  const [profile, setProfile] = useState('');
  const [profileURL, setProfileURL] = useState('');

  const ModifyLocalStorage = () => {
    localStorage.setItem("First", firstName);
    localStorage.setItem("Middle", middleName);
    localStorage.setItem("Last", lastName);
    localStorage.setItem("DOB", dateOfBirth);
    localStorage.setItem("Gender",gender);
    localStorage.setItem("Country", selectedCountry);
  }

  useEffect(() => {
    const id = localStorage.getItem("AccountID");
    fetch(`http://localhost:5300/api/auth/getAccount/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        
        return res.json();
      })
      .then((data) => {setProfileURL(data.Profile_Picture);}).then((data) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if(profileURL === undefined)
  {
    setProfileURL(Alt);
  }else{
    console.log(profileURL);
  }

  

const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("AccountID");

  const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
    }

    const formData = new FormData();
    formData.append('FirstName', firstName);
    formData.append('MiddleName', middleName);
    formData.append('LastName', lastName);
    formData.append('DateOfBirth', dateOfBirth);
    formData.append('Gender', gender);
    formData.append('file', profile);
    formData.append('Country_of_Origin', selectedCountry);

axios.put(`http://localhost:5300/api/witnesses/updateWitness/${id}`, formData, { headers })
  .then((res) => {
    console.log(res.data);
    ModifyLocalStorage();
    popup();
  })
  .catch((err) => console.log(err));
  };


  const selectCountryHandler = (value) => setSelectedCountry(value);
  countries.registerLocale(enLocale);
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  return (
    <div className="a">
        <NavWit/>
      <center>
        <div className="cover1">
          <h2 className="h2">Edit Profile</h2>
          <input style={{display:"none"}} type="file" id="File" onChange={handleFileChange}/>
          <label htmlFor="File">
          <img src={profileURL} value={profileURL} className="imgprofile" alt="Profile"/>
          </label>
          <div className="d1">
            <div>
              <label className="la">First Name</label>
              <input className="in" type="text" placeholder="John" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div className="le">
              <label className="la">Country</label>
              <br />
              <select
                className="in1"
                value={selectedCountry}
                onChange={(e) => selectCountryHandler(e.target.value) & setSelectedCountry(e.target.value)}  
              >
                {!!countryArr?.length &&
                  countryArr.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="d1">
            <div>
              <label className="la">Middle Name</label>
              <input className="in" type="text" placeholder="Allen"  value={middleName} onChange={(e)=> setMiddleName(e.target.value)} />
            </div>

            <div className="ly">
              <label className="la">Date of Birth</label>
              <input className="in2" type="date" placeholder="12/12/2002" value={dateOfBirth} onChange={(e)=> setDateOfBirth(e.target.value)}/>
            </div>
          </div>

          <div className="d1">
            <div>
              <label className="la">Last Name</label>
              <input className="in" type="text" placeholder="Doe" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
            </div>

            <div className="le">
              <label className="la">Gender</label>
              <select className="in2"value={gender} onChange={(e)=> setGender(e.target.value)} >
                <option>Choose</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non">Non-binary</option>
              </select>
            </div>
          </div>
          
          <div className={popupStyle}>
                    
                    <button className='button' onClick={closeItem}>
                    <BsXCircleFill style={style}/>
                    </button>
                    <div className='talk1'>     
                    <h3>Changes Saved</h3>
                </div>
                </div>

          <button type="submit" className="s" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </center>
    </div>
  );
};


export default WitEdit;

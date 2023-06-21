import React, { useState, useEffect } from "react";
import "../Signup/info/infos.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import NavHome from "./NavHome";
import profileImgSrc from '../img/ring1.jpg';
import { format } from 'date-fns'
import { BsXCircleFill } from 'react-icons/bs';


const MemEdit = () => {
  document.body.style.backgroundColor = "white";
  const First = localStorage.getItem("First");
  const Middle = localStorage.getItem("Middle");
  const Last = localStorage.getItem("Last");
  const DOB = localStorage.getItem("DOB");
  const dob = format(new Date(DOB), 'yyyy-MM-dd');
  const gender = localStorage.getItem("Gender");
  const Marital = localStorage.getItem("Marital");
  const Country = localStorage.getItem("Country");
  const [profileURL, setProfileURL] = useState();
  countries.registerLocale(enLocale);
  console.log(First, Middle, Last);

  const [FirstName, setFirstName] = useState(First);
  const [MiddleName, setMiddleName] = useState(Middle);
  const [LastName, setLastName] = useState(Last);
  const [DateOfBirth, setDateOfBirth] = useState(dob);
  const [Gender, setGender] = useState(gender);
  const [SocialSecurityNumber, setSocialSecurityNumber] = useState("");
  const [MaritalStatus, setMaritalStatus] = useState(Marital);
  const [SelectedCountry, setSelectedCountry] = useState(Country);


  const [popupStyle, showPopup] = useState("hide")
  const [active, setActive] = useState(false);

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

  const ModifyLocalStorage = () => {
    localStorage.setItem("First", FirstName);
    localStorage.setItem("Middle", MiddleName);
    localStorage.setItem("Last", LastName);
    localStorage.setItem("DOB", DateOfBirth);
    localStorage.setItem("Gender",Gender);
    localStorage.setItem("Marital", MaritalStatus);
    localStorage.setItem("Country", SelectedCountry);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("userID");
    fetch(`http://localhost:5300/api/members/updateMember/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify({
        FirstName,
        MiddleName,
        LastName,
        DateOfBirth,
        Gender,
        SocialSecurityNumber,
        MaritalStatus,
        Country_of_Origin: SelectedCountry,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data)).then(ModifyLocalStorage()).then(
        popup())
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
        <NavHome/>
      <center>
        <div className="cover1">
          <h2 className="h2">Edit Profile</h2>
          <img src={profileImgSrc} className="imgprofile" alt="Profile" />

          <div className="d1">
            <div>
              <label className="la">First Name</label>
              <input className="in" type="text" placeholder="John" value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}/>
            </div>

            <div className="le">
              <label className="la">Country</label>
              <br />
              <select
                className="in1"
                value={SelectedCountry}
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
              <input className="in" type="text" placeholder="Allen"  value={MiddleName} onChange={(e)=> setMiddleName(e.target.value)} />
            </div>

            <div className="ly">
              <label className="la">Date of Birth</label>
              <input className="in2" type="date" format="MM'/'dd'/'y" placeholder="12/12/2002" value={DateOfBirth} onChange={(e)=> setDateOfBirth(e.target.value)}/>
            </div>
          </div>

          <div className="d1">
            <div>
              <label className="la">Last Name</label>
              <input className="in" type="text" placeholder="Doe" value={LastName} onChange={(e)=> setLastName(e.target.value)}/>
            </div>

            <div className="le">
              <label className="la">Gender</label>
              <select className="in2"value={Gender} onChange={(e)=> setGender(e.target.value)} >
                <option>Choose</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
              </select>
            </div>
          </div>

          <div className="d1">
            <div>
              <label className="la">Enter SSN</label>
              <input className="in" type="text" placeholder="123-45-678" value={SocialSecurityNumber} onChange={(e)=> setSocialSecurityNumber(e.target.value)}/>
            </div>

            <div className="le">
              <label className="la">Marital Status</label>
              <select className="in" value={MaritalStatus} onChange={(e)=> setMaritalStatus(e.target.value)}>
                <option>Choose</option>
                <option value="3" >Divorced</option>
                <option value="2">Separated</option>
                <option value="1">Relationship</option>
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

export default MemEdit;

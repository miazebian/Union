import React, { useState, useEffect } from "react";
import "../Signup/info/infos.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import NavHome from "./NavJudge";
import profileImgSrc from '../img/ring1.jpg';
import { BsXCircleFill } from 'react-icons/bs';


const JudEdit = () => {
  document.body.style.backgroundColor = "white";

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [court, setcourt] = useState("");
  const [education, seteducation] = useState("");
  const [Startdate, setStartDate] = useState("");
  const [Enddate, setEndtDate] = useState("");




  useEffect(() => {
    // fetch user data and set state accordingly
    // example fetch code
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setFirstName(data.firstName);
        setMiddleName(data.middleName);
        setLastName(data.lastName);
        setDateOfBirth(data.dateOfBirth);
        setGender(data.gender);
        setcourt(data.court);
        seteducation(data.education);
        setSelectedCountry(data.country);
        setEndtDate(data.Enddate);
        setStartDate(data.Startdate);
      })
      .catch((err) => console.log(err));
  }, []);


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
  const handleSubmit = (e) => {
    e.preventDefault();
    // update user data in database
    // example update code
    fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        gender,
        country: selectedCountry,
        court,
        education,
        Enddate,
        Startdate,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(popup)
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

          <div className="d1">
            <div>
              <label className="la">Court Name</label>
              <input className="in" type="text" placeholder="Raliegh state court" value={court} onChange={(e)=> setcourt(e.target.value)}/>
            </div>

            <div className="le">
              <label className="la">Education</label>
              <input className="in" type="text" placeholder="Havard Law School" value={education} onChange={(e)=> seteducation(e.target.value)} />

            </div>
          </div>

          <div className="newl">
            <center>
            <label className="la">Enter Term</label>
            </center>
          </div>

          <div className="d1">
            <div>
              <label className="la">Start Date</label>
              <input className="in2" type="date" placeholder="12/12/2020" value={Startdate} onChange={(e)=> setStartDate(e.target.value)} />
            </div>

            <div className="lt">
              <label className="la">End Date</label>
              <input className="in2" type="date" placeholder="12/12/2025" value={Enddate} onChange={(e)=> setEndtDate(e.target.value)} />
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

export default JudEdit;

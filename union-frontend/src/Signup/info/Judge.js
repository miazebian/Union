import { React, useState } from "react";
import "./infos.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {useNavigate, useLocation } from 'react-router-dom';
import Add from "../../img/addAvatar.png";
import axios from 'axios';

export const Judge = () => {
  document.body.style.backgroundColor = "white";
  const location = useLocation();
  const navigate = useNavigate();
  const { username,email,password,Accountype } = location.state || {};
  console.log("From Judge Page");
  console.log("username:",username," email: ",email," pass: ",password," account type",Accountype);
  const nav= () => {
    navigate('/');
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [Profile_Picture, setProfilePicture] = useState('');
  const [FirstName, setFirstName] = useState("");
  const [MiddleName, setMiddleName] = useState("");
  const [LastName, setLastName] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Gender, setGender] = useState("");
  const [Court, setCourt] = useState("");
  const [Education, setEducation] = useState("");
  const [TermStartDate, setTermStartDate] = useState("");
  const [TermEndDate, setTermEndDate] = useState("");

  const selectCountryHandler = (value) => setSelectedCountry(value);
  countries.registerLocale(enLocale);
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: value,
    };
  });
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ username, email, password });
    var Country_of_Origin = selectedCountry
    console.log('Hello')
    const formData = new FormData();
    formData.append("file", Profile_Picture);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("Accountype", Accountype);
    formData.append("FirstName", FirstName);
    formData.append("MiddleName", MiddleName);
    formData.append("LastName", LastName);
    formData.append("DateOfBirth", DateOfBirth);
    formData.append("Gender", Gender);
    formData.append("Court", Court);
    formData.append("Education", Education);
    formData.append("Country_of_Origin", Country_of_Origin);
    formData.append("TermStartDate", TermStartDate);
    formData.append("TermEndDate", TermEndDate);
    axios.post("http://localhost:5300/api/auth/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        nav();
        console.log(response.data, "User registered");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="a">
      <center>
        <div className="cover1">
          <h2 className="h2">
            Please fill out the following info to complete your account
          </h2>
          <form onSubmit = {handleSubmit}>
          <div className="d1">
            <div>
              <label className="la">Enter First Name </label>
              <input className="in" type="text" placeholder="John" value={FirstName}
              onChange={(e) => setFirstName(e.target.value)} required/>
            </div>

            <div className="le">
              <label className="la">Enter Your Country</label>
              <br></br>
              <select
                className="in1"
                value={selectedCountry}
                onChange={(e) => selectCountryHandler(e.target.value)}
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
              <label className="la">Enter Middle Name</label>
              <input className="in" type="text" placeholder="Allen" 
              value = {MiddleName}
              onChange = {(e) => setMiddleName(e.target.value)}
              />
            </div>

            <div className="ly">
              <label className="la">Enter Date of Brith</label>
              <input className="in2" type="date" placeholder="12/12/2002" 
              value = {DateOfBirth}
              onChange = {(e) => setDateOfBirth(e.target.value)}
              />
            </div>
          </div>

          <div className="d1">
            <div>
              <label className="la">Enter Last Name </label>
              <input className="in" type="text" placeholder="Doe" 
              value = {LastName}
              onChange = {(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="le">
              <label className="la">Enter Your Gender</label>
              <select className="in2"
              value = {Gender}
              onChange = {(e) => setGender(e.target.value)}
              >
                <option>Choose</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non">Non-binary</option>
              </select>
            </div>
          </div>

          <div className="d1">
            <div>
              <label className="la">Enter Court Name</label>
              <input className="in" type="text" placeholder="Raliegh state court" 
              value = {Court}
              onChange = {(e) => setCourt(e.target.value)}
              />
            </div>

            <div className="le">
              <label className="la">Enter Education</label>
              <input className="in" type="text" placeholder="Havard Law School" 
              value = {Education}
              onChange = {(e) => setEducation(e.target.value)}
              />
            </div>
          </div>

          <div className="newl">
            <center>
            <label className="la">Enter Term</label>
            </center>
          </div>

          <div className="d1">
            <div>
              <label className="la">Enter Start Date</label>
              <input className="in2" type="date" placeholder="12/12/2020" 
              value = {TermStartDate}
              onChange = {(e) => setTermStartDate(e.target.value)}
              />
            </div>

            <div className="lt">
              <label className="la">Enter End Date</label>
              <input className="in2" type="date" placeholder="12/12/2025" 
              value = {TermEndDate}
              onChange = {(e) => setTermEndDate(e.target.value)}
              />
            </div>
          </div>
          <div>
          <input style={{display:"none"}} type="file" id="File" onChange={handleFileChange}/>
          <label htmlFor="File">
          <img className = "Profile_Image" src={Add} alt=""/>
          <span>Add an Avatar</span>
          </label>
          </div>
          </form>
          <button type="submit" className="s" onClick={handleSubmit}>
            SignUp
          </button>
        </div>
      </center>
    </div>
  );
};

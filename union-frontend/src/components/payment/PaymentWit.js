import {React, useState} from "react";
import "./payment.css";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import FriendSuggestions from "../container/FriendSuggestions";
import { useNavigate } from "react-router-dom";
import NavWit from "../../Witness/NavWit";

export const PaymentWit = () => {
  const [showDiv, setShowDiv] = useState(true);
  const navigate = useNavigate();

  const nav = () => {
    navigate('/homewit');
  };
  const handleClick = () => {
    setShowDiv(false);
  };

  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleButtonClick = () => {
    setIsButtonPressed(true);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (value) => setSelectedCountry(value);
  countries.registerLocale(enLocale);
  const countryObj = countries.getNames("en", { select: "official" });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: value,
    };
  });

  const token = localStorage.getItem("token");
    
  const [account, setaccount]=useState([]);

  const [fullName, setFullName] = useState("");
  const [personType, setPersonType] = useState("j");
  const [personFullName, setPersonFullName] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [personType1, setPersonType1] = useState("");

  

  const findperson = async () => {
    const [firstName, lastName] = personFullName.split(" ");


    if(personType==="j"){
      setPersonType1(2);
    }

    const response = await fetch(
      `http://localhost:5300/api/Search/SearchForPayment/${firstName}/${lastName}/${personType1}/${selectedCountry}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
     console.log(data);
     if(personType1===2)
     setaccount(data.judge);

     setShowDiv(false);

  };


  return (
    <div className="payment-cover">
        <NavWit/>
      <div className="centered-payment">
        <h2>Payment</h2>
        {showDiv &&
        <div className="payment-div left-payment">
          <h3>Person Information</h3>

          <div className="payment-label">
            <label>Your Full Name</label>
          </div>
          <input
              className="payment-input"
              type="text"
              placeholder="John Allen Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

                    <div className="payment-label">
          <label>Choose the type of person your paying</label>
          </div>
          <input style={{backgroundColor:"#b2cdd8"}}
            className="payment-input"
            type="text"
            value={"Judge"}
          />

          <div className="payment-label">
            <label>Person's Full Name</label>
          </div>
          <input
            className="payment-input"
            type="text"
            placeholder="Jane Allen Doe"
            value={personFullName}
            onChange={(e) => setPersonFullName(e.target.value)}
          />
          <div className="payment-label">
            <label>Country officated</label>
          </div>
          <select
              className="payment-input"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
                {!!countryArr?.length &&
                  countryArr.map(({ label, value }) => (
                    <option key={value} value={label}>
                      {label}
                    </option>
                  ))}
              </select>
              <br></br>
              <div className="div-btn-payment">
              <button className="payment-btn" onClick={findperson}>Find person</button>
          </div>
          
          <div className="line"></div>
              </div>}

              {!showDiv && <div>
              <div className="payment-div left-payment findperson">
              <FriendSuggestions className="findperson" friendList={account}/>
              <div className="div-btn-payment1">
              <button className="payment-btn" onClick={handleButtonClick}>Confirm Person</button>
              <button className="payment-btn" onClick={refreshPage}>Retry</button>
              </div>
              </div> 
          
          </div>}

        

        {isButtonPressed && (
      
        <div className="payment-div right-payment">
          <h3>Credit Card Information</h3>
          <div classname="payment-left-in">
          <div className="payment-label">
            <label>Name on Card</label>
          </div>
          <input
            className="payment-input"
            type="text"
            placeholder="Jane Allen Doe"
          />
          <div className="payment-label">
            <label>Credit Card Number</label>
          </div>
          <input
            className="payment-input"
            type="number"
            placeholder="4916 5732 9851 6018"
          />
          <div className="payment-label">
            <label>Expriy month/year</label>
          </div>
          <input
            className="payment-input"
            type="date"
            placeholder="12/2025"
          />
          <div className="div-btn-payment2">
            <button className="payment-btn" onClick={nav}>Submit Payment</button>
          </div>
          </div>
        </div>
        
        )}
      </div>
    </div>
  );
};

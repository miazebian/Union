import React, { useState, useEffect, useRef } from "react";
import "./profile.css";
import img from "../../img/ukraine-gf6b96d5ce_1280.png";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";
import Flag from 'react-world-flags'
import countries from 'i18n-iso-countries';
import { BiImport } from 'react-icons/bi';
import axios from 'axios';
import Alt from '../../img/ring1.jpg';

function AddReviewForm({ accountid, accountID }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [Documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    setIsLoading(true);

    fetch(
      `http://localhost:5300/api/Reviews/AddReview/${accountid}/${accountID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ review:comment, rating:rating }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
       // console.log("Review submitted successfully:", data);
        setIsLoading(false);
        setComment("");
        setRating(0);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        setIsLoading(false);
      });
      window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>
            Rating:
            <br />
            <select
              className="border3"
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
            >
              <option value={0}>Select rating</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
        </div>
        <br />
        <div>
          <label>
            Comment:
            <br />
            <center>
              <textarea
                className="border2"
                rows={10}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </center>
          </label>
        </div>
        <br />
        <button className="button5" type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
}



function Profile({ accountID }) {
  const [account, setaccount] = useState([]);
  const navigate = useNavigate();
  const [profileURL, setProfileURL] = useState("");
  const accountid = localStorage.getItem("AccountID");
  const [init, setinit]=useState(true);
  const [link, setlink]=useState([]);
//var link="";

  useEffect(() => {
    if (accountID === `${accountid}`) {
      accountID = localStorage.getItem("AccountID");
    }
    fetch(`http://localhost:5300/api/auth/getAccount/${accountID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        
        return res.json();
      })
      .then((data) => {setProfileURL(data.Profile_Picture);setaccount((account) => [...account, data])}).then((data) => {
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accountID, account]);
  if(profileURL === undefined)
  {
    setProfileURL(Alt);
  }

  const token = localStorage.getItem("token");

  const [reviews, setreviews] = useState([]);

  useEffect(() => {
    if (accountID === `${accountid}`) {
      accountID = localStorage.getItem("AccountID");
    }
    fetch(`http://localhost:5300/api/Reviews/getReview/${accountID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => 
      setreviews((reviews) => [...reviews, data]))
      .catch((err) => {
        console.log(err);
      });
  }, [account, accountID]);

 // console.log(reviews);
  const [rate, setrate] = useState(0);

  const [r, setr] = useState([]);
  useEffect(() => {
    if (reviews.length !== 0) {
      setr(reviews[0].Reviews);
      setrate(reviews[0].overallRating);
    }
  }, [reviews]);
//  console.log(r);

  const [type, settype] = useState("");
  const [name, setname] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setgender] = useState("");
  const [country, setCountry] = useState("");
  const [martial, setmartial] = useState("");
  const [dob, setdob] = useState("none");
  const [typ, setype] = useState("");
  const [mar, setmar] = useState("Not Relevent");
  const [email, setemail] = useState("");

  const [court, setcourt] = useState("");
  const [TermStartDate, setTermStartDate] = useState("");
  const [TermEndDate, setTermEndDate] = useState("");
  const [Education, setEducation] = useState("");
  const [sd, ssd] = useState("");
  const [ed, sed] = useState("");



  useEffect(() => {
    if (account.length !== 0) {
      settype(account[0].Accountype);
      setname(
        account[0].FirstName +
          " " +
          account[0].MiddleName +
          " " +
          account[0].LastName
      );
      setDOB(account[0].DOB);
      setgender(account[0].gender);
      setCountry(account[0].Country_of_Origin);
      setemail(account[0].email);

      if (type === 2) {
        setTermStartDate(account[0].TermStartDate);
        ssd(TermStartDate.substring(0, 10));
        setTermEndDate(account[0].TermEndDate);
        sed(TermEndDate.substring(0, 10));
        setcourt(account[0].Court);
        setEducation(account[0].Education);
      }

      if (type === 1) {
        setmartial(account[0].martial);
        if (martial === 1) {
          setmar("Relationship");
        } else {
          if (martial === 2) setmar("Divorced");
          else {
            if (martial === 3) setmar("Single");
          }
        }
      }

      if (type === 1) {
        setype("Member");
      } else {
        if (type === 2) {
          setype("Judge");
        } else {
          if (type === 3) {
            setype("Witness");
          }
        }
      }

      if (DOB !== "" || DOB === undefined){ 
      setdob(DOB.substring(0, 10));
      }
    }
  }, [account, DOB, type, martial, TermEndDate, TermStartDate]);

  function empty(e) {
    if (e === "" || e === null) {
      return "none";
    } else return e;
  }


// register the "en" locale for English language country names
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

// get an object containing official country names for the "en" locale
const countryNames = countries.getNames("en", { select: "official" });

// create an array of objects, each containing a label (official country name) and value (ISO country code) property
const countryArr = Object.entries(countryNames).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

  
  function getKeyFromLabel(label) {
    for (let i = 0; i < countryArr.length; i++) {
      if (countryArr[i].label === label) {
        return countryArr[i].value;
      }
    }
    return label;
  }

  function judge() {
    if (type === 2) {
      if (sd !== "" || sd !== undefined) {
        return (
          <div>
            <br></br>
            <h2>Term Start Date</h2>
            <p style={{ fontSize: "18px" }}>{empty(sd)}</p>
            <br></br>
            <h2>Term End Date</h2>
            <p style={{ fontSize: "18px" }}>{empty(ed)}</p>
            <br></br>
            <h2>Court</h2>
            <p style={{ fontSize: "18px" }}>{empty(court)}</p>
            <br></br>
            <h2>Education</h2>
            <p style={{ fontSize: "18px" }}>{empty(Education)}</p>
            <br></br>
          </div>
        );
      }
    }
  }

  const buttonedit = (event) => {
    event.preventDefault();
    if (type === 1) {
      navigate("/memedit");
    }
    if (type === 2) {
      navigate("/judedit");
    }
    if (type === 3) {
      navigate("/witedit");
    }
  };

  function check() {
    if (accountID === accountid) {
      return <FaEdit className="iconin" />;
    }
  }

  function checkrate() {
    if (accountID !== accountid) {
      return (
        <div>
          <button onClick={handleAddReviewClick} className="button4">
            Add Review
          </button>
        </div>
      );
    }
  }

useEffect(()=>{
  if(init){
   //  console.log(init);
     fetch(`http://localhost:5300/api/Uploads/getFiles/${accountID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    })
    .then((data) => {
     // console.log(data);
      if (data.message === "Documents found") {
        data.documents.forEach((item) => {
          if (!link.includes(item.id)) {
           setlink((prevlink)=> [...prevlink,item.id]);
            setinit(false);
          }
        });
      }
    }      
    )
    .catch((err) => {
      console.log(err);
    });
    
  }
},[init, token, accountid,link, accountID]);

const [selectedFile, setSelectedFile] = useState([]);

function handleFileInputChange(event) {
  setSelectedFile(event.target.files);
}

function handleFileUpload(event) {
  event.preventDefault();
  const formData = new FormData();
  for (let i = 0; i < selectedFile.length; i++) {
    formData.append("files", selectedFile[i]);
  }

  axios.post(`http://localhost:5300/api/Uploads/uploadFiles/${accountid}`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }).then((res) => {
    return res.json();
  })
  .then((data) => console.log(data));
  window.location.reload();
  window.location.reload();

};

 function checkdocument() {

    if (accountID === accountid) {
      return (
        <div >
       <form onSubmit={handleFileUpload} >
       <div className="file-input-container">
      <label htmlFor="file-input">
        <BiImport size={60} color="#404040" />
      </label>
      <input id="file-input" type="file" onChange={handleFileInputChange} multiple />
    
      <button type="submit" className="button5" style={{color:"#404040", fontSize:"105%"}}>Upload</button>
      </div>
    </form>
      </div>
      );
    }
  }


  const [inti1, setinti1]=useState(true);
  const id = localStorage.getItem('AccountID');
  const [con, setcon]=useState("");

  useEffect(()=>{
    console.log(inti1);
    if(accountID!==undefined && accountID!==id && inti1){
      console.log(accountID);
     fetch(`http://localhost:5300/api/Connection/is_Connection_Accepted/${id}/${accountID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    }).then((data)=> data.message==="0"? setcon("Add Connection"): setcon("Connection Made"))
    .catch((err) => {
      console.log(err);
    });
    setinti1(false);
  }
  },[]);

 

  const showdocument=()=>{
    if(link.length===0){
      return(
        <p style={{ fontSize: "18px" }} >No Documents at the moment</p>
      )
    }
  }

  async function addConnectionion (e)  {
    e.preventDefault();
    const event=con;
    console.log(event);
    if(event==="Add Connection"){
    if(accountid!==undefined){
    const response = await fetch(`http://localhost:5300/api/Connection/createConnection/${id}/${accountID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    //console.log(name+" "+accountid);
    //console.log(data);
    return (data.message);
  }
}
}

//console.log(con);

  function emptyreview() {
    if (reviews.length === 0) {
      return <p style={{ fontSize: "18px" }}>No Reviews Yet</p>;
    }
  }
  const [isFormVisible, setIsFormVisible] = useState(false);
  const handleAddReviewClick = () => {
    setIsFormVisible(true);
  };
  const uniqueArr = [...new Set(link)];

  const rows = [];
  for (let i = 0; i < uniqueArr.length; i += 3) {
    rows.push(uniqueArr.slice(i, i + 3));
  }

  return (

    <div className="background">
      <center>
        {country==="" ?
        <img
        src={Alt}
        alt="image"
        style={{width:"50%",height:"250px"}}
        />
        :
      <Flag
      code={getKeyFromLabel(country)}
      svg
      height='250px'
      alt="Country Image"
      className="background-img"
    />
}
      </center>

      <img src={profileURL} className="imgprofile1" alt={img} />

      <div className="profileall">
        <div className="con">
          <div className="info">
            <h1>{name}</h1>
          </div>
          <div className="info">
            <h2>Location</h2>

            <p>{country}</p>
          </div>
          <div className="info">
            <h2>Type</h2>
            <p>{typ}</p>
          </div>
          <div >
          <div className="btn-cont">
          <button className="button7" value={con} onClick={addConnectionion}>
          {con}</button>
          </div>
        </div>
        </div>
        <Tabs>
          <TabList>
            <Tab style={{ width: "33%", fontSize: "20px" }}>Information</Tab>
            <Tab style={{ width: "33%", fontSize: "20px" }}>Documents</Tab>
            <Tab style={{ width: "33%", fontSize: "20px" }}>Feedback</Tab>
          </TabList>

          <TabPanel>
            <br></br>
            <div>
              <button className="iconedit" onClick={buttonedit}>
                {check()}
              </button>
            </div>

            <h2>Name</h2>
            <p style={{ fontSize: "18px" }}>{empty(name)}</p>
            <br></br>

            <h2>Rating</h2>
            <StarRating rating={rate} />
            <br></br>

            <h2>Gender</h2>
            <p style={{ fontSize: "18px" }}>{empty(gender)}</p>
            <br></br>

            <h2>Account Type</h2>
            <p style={{ fontSize: "18px" }}>{empty(typ)}</p>
            <br></br>
         
            <h2>Country</h2>
            <p style={{ fontSize: "18px" }}>{empty(country)}</p>
            <br></br>

            <h2>Date of Birth</h2>
            <p style={{ fontSize: "18px" }}>{empty(dob)}</p>
            <br></br>

            <h2>Email</h2>
            <p style={{ fontSize: "18px" }}>{empty(email)}</p>
            <br></br>

            <h2>Martial Status</h2>
            <p style={{ fontSize: "18px" }}>{empty(mar)}</p>

            {judge()}
          </TabPanel>

          <TabPanel >
            <br></br>

            <h2>Documents</h2>
            <p>Show Documents</p>
            {showdocument()}


            <div  className="col1">
              
            {rows.map((row, index) => (
        <div className="row" key={index}>
          {row.map((item, itemIndex) => (
            <div key={itemIndex} className="space">
              <iframe className="iframe" src={`https://drive.google.com/file/d/${item}/preview`}></iframe>

            </div>
          ))}
        </div>
      ))}

        
        </div>
        <br></br>
            <center>
            <br></br>

              {checkdocument()}
            </center>
            <br></br>
          </TabPanel>

          <TabPanel>
            <br></br>
            <h2>User Feedback</h2>
            <br></br>
            <h3>Overall Rating</h3>
            <StarRating rating={rate} />
            <br></br>

            {checkrate()}

            <br></br>
            <h3>Individual Ratings</h3>
            <br></br>
            {emptyreview()}

            {isFormVisible && (
              <AddReviewForm accountid={accountid} accountID={accountID} />
            )}

            {r.map((jude) => (
              <div className="border">
                <div>
                  <h3 style={{ display: "inline-flex" }}>Anyoumous</h3>
                  &nbsp;
                  <p style={{ display: "inline-flex", fontSize: "9px" }}>
                    {jude.createdAt.substring(0, 10)}
                  </p>
                </div>
                <StarRating rating={jude.rating} />
                <p>{jude.comment} </p>
              </div>
            ))}
          </TabPanel>
        </Tabs>
      </div>
      <br></br>
      <br></br>
    </div>
  );
}

export default Profile;

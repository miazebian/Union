import React, { useEffect, useState } from "react";
import "./contact.css";
import Chatcont from "../ChatCont/Chatcont";

function Contact() {
  const [search, setsearch] = useState("");
  const [accounts, setaccounts] = useState([]);
  const [init, setinit] = useState(true);
  const Accountid = localStorage.getItem("AccountID");
  const [inti, setinti] = useState(true);
  const [inti1, setinti1] = useState(true);
  const [connections, setConnestions] = useState([]);
  const token = localStorage.getItem("token");
  const [currentChatuser, setcurrentChatUser]=useState([]);
  const [group,setgroup]=useState([]);
  const [groupacc, setgroupacc]=useState([]);

  function SearchResults({ results }) {
    return (
      <div>
        {results.map((item) => (
          <center>
          <div className="UserCont">
            <img src={item.Profile_Picture} onClick={(e)=>handleaccounts(item)} className="Chatuserimage" alt="" />
            <div className="usertext1">
              <p
                style={{
                  color: "white",
                  textAlign: "start",
                  marginTop: "13%",
                  fontSize: "large",
                }}
              >
                {item.username}
              </p>
              <p
                style={{
                  color: "white",
                  textAlign: "start",
                  marginTop: "0px",
                  fontSize: "medium",
                }}
              >
                Open your messages
              </p>
            </div>
          </div>
        </center>
        ))
        }
      </div>
    );
  }
  const [results, setResults] = useState([]);
  

  function searching(){
    if(search!==''){
      const searchResults = accounts.filter((item) => item.username === search);
      setResults(searchResults);
  }
  }
  useEffect(() => {
    if (inti) {
      fetch(
        `http://localhost:5300/api/Connection/getConnectionBySender/${Accountid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => setConnestions(data))
        .catch((err) => {
          console.log(err);
        });
    }
    setinti(false);
  }, [inti, token, Accountid]);

  const conn = Object.values(connections);

  useEffect(() => {
    if (inti1) {
      fetch(
        `http://localhost:5300/api/Connection/getGroup/${Accountid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => setgroup(data))
        .catch((err) => {
          console.log(err);
        });
    }
    setinti1(false);
  }, [inti1, token, Accountid]);

 // console.log(group);

  const [rec, setRec] = useState([]);

  useEffect(() => {
    const getr = () => {
      conn.forEach((item) => {
        //  console.log(item);

        if (!rec.includes(item.Receiver)) {
          //     console.log(item);
          //change to 1
          if (item.Status === "1") {
            setRec((prevRec) => [...prevRec, item.Receiver]);
          }
        }
      });
    };
    getr();
  }, [connections, rec, conn]);
  const recs = Object.values(rec);

  useEffect(() => {
    if (init) {
      recs.map((item) => {
        if (!accounts.includes(item)) {
          fetch(`http://localhost:5300/api/auth/getAccount/${item}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => setaccounts((accounts) => [...accounts, data]))
            .catch((err) => {
              console.log(err);
            });
          setinit(false);
        }
      });
    }
  }, [rec, recs, init, accounts]);
//console.log(group);
  const [init2,setinit2]=useState(true);
  useEffect(() => {
    if(init2 && group.length!==0){
      group.forEach((item) => {
        if(item.Sender!==Accountid){
         // console.log(3);
          fetch(`http://localhost:5300/api/auth/getAccount/${item.Sender}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {              
              data[data.length]=item._id;
              data[data.length-1]=item.Name;              
              setgroupacc((accounts) => [...accounts, data]);
                         
        })
            .catch((err) => {
              console.log(err);
            });          
        }
       // console.log(item);
          item.Receiver.map((item1)=>{
            fetch(`http://localhost:5300/api/auth/getAccount/${item1}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              data[data.length]=item._id;    
              data[data.length-1]=item.Name;                        
              setgroupacc((accounts) => [...accounts, data]);
              
          })
            .catch((err) => {
              console.log(err);
            });
          })
      });
      setinit2(false);
    }
  
  }, [group, init2, Accountid, groupacc]);

 // console.log(groupacc);

  const handleaccounts=(e)=>{
    setcurrentChatUser(e);
    
  }

  const [showModal, setShowModal] = useState(false);
  const [selectedConnections, setSelectedConnections] = useState([]);
  const [namegroup,setNamegroup]=useState('');

  //console.log(namegroup);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(selectedConnections);
    
    fetch(`http://localhost:5300/api/Connection/CreateGroupConnection/${Accountid}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Receiver:selectedConnections, Name:namegroup }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Group created:", data);
    })
    .catch((error) => {
      console.error("Error creating group:", error);
    });
    setShowModal(false);
    setNamegroup('');
    setSelectedConnections([]);
  };

 // console.log(groupacc);
  
  return (
    <div >
      <div className="mainContactContainer">
        <div style={{ padding: "2%" }} >
          <div>
          <input
            className="searchforcontact"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            type="search"
            placeholder="Search your Connections"
          />
          <button className="buttontext1" onClick={searching}>Search</button>
          </div>
          <button
  className="buttontext1"
  style={{ backgroundColor: "#b2cdd8" }}
  onClick={() => setShowModal(true)}
>
  Create a Group
</button>

          <SearchResults results={results} />
        </div>
        {showModal && (
  <div className="modal">
    <div className="modal-content">
    <form>
  <h2>Create a New Group</h2>
  <div>
  <input  className="groupname" type="text" placeholder="Group Name" value={namegroup} onChange={e => setNamegroup(e.target.value)}/>
    {accounts.map((item) => (
      <div style={{display:"flex"}} key={item.AccountID}>
       
        <input
          type="checkbox"
          id={item.AccountID}
          name={item.username}
          value={item.AccountID}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedConnections((prev) => [...prev, e.target.value]);
            } else {
              setSelectedConnections((prev) =>
                prev.filter((id) => id !== e.target.value)
              );
            }
          }}
          
        />
        
        <label htmlFor={item.AccountID} style={{width:"100%"}}> 
        <div className="UserCont" >
          <img src={item.Profile_Picture} className="Chatuserimage" alt="" />
          <div className="usertext1">
            <p
              style={{
                color: "white",
                textAlign: "start",
                marginTop: "13%",
                fontSize: "large",
              }}
            >
              {item.username}
            </p>
            </div>
            </div>
            </label>
      </div>
    ))}
  </div>
  <button type="submit" className="buttontext1" onClick={handleSubmit}>Create Group</button>
</form>

      <button className="buttontext1" style={{backgroundColor:"#b2cdd8"}} onClick={() => setShowModal(false)}>Close</button>
    </div>
  </div>
)}

        {results.length === 0 && (

<div className="userDetailsCont">

{group.map((item)=>(
             <div>
                {item?.AccountID!==Accountid ?
             <center>
               <div className="UserCont">
                 <img  onClick={(e)=>handleaccounts(item)} className="Chatuserimage" alt="" />
                 <div className="usertext1">
                 
                   <p
                     style={{
                       color: "white",
                       textAlign: "start",
                       marginTop: "13%",
                       fontSize: "large",
                     }}
                   >
                     {item.Name}
                   </p>

                   <p
                     style={{
                       color: "white",
                       textAlign: "start",
                       marginTop: "0px",
                       fontSize: "medium",
                     }}
                   >
                     Open your messages
                   </p>
                 </div>
               </div>
             </center>:""
        }
           </div>
        ))}



        {accounts.map((item)=>(
             <div>
                {item?.AccountID!==Accountid ?
             <center>
               <div className="UserCont">
                 <img src={item.Profile_Picture} onClick={(e)=>handleaccounts(item)} className="Chatuserimage" alt="" />
                 <div className="usertext1">
                   <p
                     style={{
                       color: "white",
                       textAlign: "start",
                       marginTop: "13%",
                       fontSize: "large",
                     }}
                   >
                     {item.username}
                   </p>
                   <p
                     style={{
                       color: "white",
                       textAlign: "start",
                       marginTop: "0px",
                       fontSize: "medium",
                     }}
                   >
                     Open your messages
                   </p>
                 </div>
               </div>
             </center>:""
        }
           </div>
        ))}


</div>

        )}
      </div>
      {currentChatuser!== '' ?
      <Chatcont currentChatuser={currentChatuser} />
      :
      <div>
        <h2 style={{color:"#404040", padding:"2%"}} >&ensp;&ensp;&ensp;Open Your Messages Tab to chat with your connections</h2>
        </div>
    }
    </div>
  );
  
}

export default Contact;

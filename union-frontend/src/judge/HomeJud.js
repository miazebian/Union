import React, { useState, useEffect } from 'react';
import NavJudge from "./NavJudge"
import FriendSuggestions from '../components/container/FriendSuggestions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "../Hompage/home.css"
import SlideShow from '../Hompage/slideshow/SlideShow';
import Newsletter from '../Hompage/news/Newsletter.js';
import { Footer } from '../Hompage/footer/Footer';
import photo2 from    '../img/images.jpg';
import photo3 from    '../img/download1.jpg';
import photo1 from '../img/fileBEQ5Q86X.jpg';



export const HomeJud = () => {
  document.body.style.backgroundColor = "white";
  const [currentFriendIndex, setCurrentFriendIndex] = useState(0);
  const id = localStorage.getItem('AccountID');
  const [connections, setConnestions] = useState([]);
  const [rec, setRec] = useState([]);
  const [accounts, setaccounts]=useState([]);
  const [account1, setaccount1]=useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`http://localhost:5300/api/Connection/getConnectionBySender/${id}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
     }).then((res) => {
       return res.json();
     }).then((data) => setConnestions(data))
     .catch((err) => {
       console.log(err);
     });},[]);
 
    // console.log(connections);
 
     const conn = Object.values(connections);
 
    // console.log(conn);
 
     useEffect(() => {
       const getr = () => {
         conn.forEach((item) => {
         //  console.log(item);
 
           if (!rec.includes(item.Receiver)) {
        //     console.log(item);
             //change to 1
             if(item.Status==='1'){
             setRec((prevRec) => [...prevRec, item.Receiver]);
           }
         }
         });
       };
       getr();
     }, [connections, rec, conn]);
 const recs = Object.values(rec);
 //console.log(rec);
 //console.log(recs);
 
 useEffect(() => {
   recs.map((item) => {
     if(!accounts.includes(item)){
   fetch(`http://localhost:5300/api/auth/getAccount/${item}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      return res.json();
    }).then((data)=> setaccounts((accounts) => [...accounts, data]))
    .catch((err) => {
      console.log(err);
    });}
   })
   },[rec, recs, accounts]);
 
   //console.log(accounts);
 
 
 useEffect(() => {
   const getr1 = () => {
     accounts.forEach((item) => {
     
       if (!account1.includes(item)) {
 
         setaccount1((account1) => [...account1, item]);
     }
     });
   };
   getr1();
 }, [accounts, account1]);
 //console.log(account1);
     const account = Object.values(account1);
 
     const conns = account.slice(
      currentFriendIndex,
      currentFriendIndex + 1
    );
  
    const handleNextFriendClick = () => {
      if(account.length!==0)
      setCurrentFriendIndex((currentFriendIndex + 1) % account.length);
    };
  
    const handlePreviousFriendClick = () => {
      if(account.length!==0)
      setCurrentFriendIndex(
        (currentFriendIndex + account.length - 1) % account.length
      );
    };
 
    function notEmpty(){
      if(account.length>1){
        return (
          <div>
          <button className="slider-btn slider-btn-left"  onClick={handlePreviousFriendClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className="slider-btn slider-btn-right" onClick={handleNextFriendClick}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button></div>
        );
      }
    }
   
  

  const images = [
    photo1,photo2, photo3,
  ];

  return (
    <div>
      <NavJudge />
      <SlideShow images={images} />

      
      <h2 className='home-h2'>Connections</h2>
      <div>
        <div>
          {notEmpty()}
        </div>
        {conns
  .filter((con) => con.AccountID !== id)
  .map((con) => (
    <FriendSuggestions friendList={[con]} />
  ))}
       
      </div>
      <Newsletter/>
      <Footer/>
      
    </div>
  );
};

export default HomeJud;

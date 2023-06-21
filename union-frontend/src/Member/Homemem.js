import React, { useState } from 'react';
import { useEffect } from 'react';
import Nav from './NavHome';
import FriendSuggestions from '../components/container/FriendSuggestions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "../Hompage/home.css"
import SlideShow from '../Hompage/slideshow/SlideShow';
import Newsletter from '../Hompage/news/Newsletter.js';
import { Footer } from '../Hompage/footer/Footer';
import photo1 from '../img/fileBEQ5Q86X.jpg';
import photo2 from    '../img/images.jpg';
import photo3 from    '../img/download1.jpg';


export const Homemem = () => {
  document.body.style.backgroundColor = "white";

  const token = localStorage.getItem('token');
  const [currentFriendIndex, setCurrentFriendIndex] = useState(0);
  const [witnessList, setWitnessList] = useState([]);
  const [judList, setjudList] = useState([]);
  const id = localStorage.getItem('AccountID');
  const [connections, setConnestions] = useState([]);
  const [rec, setRec] = useState([]);
  const [accounts, setaccounts]=useState([]);
  const [account1, setaccount1]=useState([]);
  const [init, setinit]=useState(true);

  useEffect(() => {
    if(init){
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
     });
     setinit(false);
    }}, [id, token, init]);
 //   console.log(connections);

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

//console.log(witnessList);
const [initacc, setinitacc]=useState(true);
useEffect(() => {
  if(initacc){
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
 });
 setinitacc(false);}
})
  }
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


  useEffect(() => {
    fetch('http://localhost:5300/api/judges/getAllJudges', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    }).then((data) => setjudList(data)).catch((err) => {
      console.log(err);
    });},[judList, token]);

  useEffect(() => {
    fetch('http://localhost:5300/api/witnesses/getAllWitness', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    }).then((data) => 
    setWitnessList(data)).catch((err) => {
      console.log(err);
    });},[witnessList, token]);
  

  
  const judelist = Object.values(judList);


  const [wf, setwf] = useState(0);
  const [jf, setjf] = useState(0);

  const hwf = () => {
    setwf((wf + 1) % witnessList.witnesses.length);
  };
 

  const hwfp = () => {
    setwf((wf + witnessList.witnesses.length - 1) % witnessList.witnesses.length);
  };
  const hjf = () => {
    setjf((jf + 1) % judelist.length);
  };

  const [witnesses, setwit]=useState([]);

  useEffect(()=>{
    if(witnessList.length!==0 && witnessList!==undefined){
      setwit(witnessList.witnesses.slice(wf, wf + 1));
    }
  },[witnessList,wf]);
  
  //console.log(witnesses);

   
  const judess = judelist.slice(
    jf,
    jf + 1
  );

  //console.log(judess);

  const hjfp = () => {
    setjf(
      (jf + judelist.length - 1) % judelist.length
    );
  };
  
  const images = [
    photo1, photo2, photo3,
  ];

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
 // console.log(witnesses);

  

  return (
    <div>
      <Nav />
      <SlideShow images={images} />

      
      <h2 className='home-h2'>Connections</h2>
      <div>
        <div >
       {notEmpty()}
        </div>   
        {conns
  .filter((con) => con.AccountID !== id)
  .map((con) => (
    <FriendSuggestions friendList={[con]} />
  ))}
       
      </div>

      <h2 className='home-h2'>Find a Witness</h2>
      <div>
        <div>
        <button className="slider-btn slider-btn-left"  onClick={hwfp}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button n className="slider-btn slider-btn-right" onClick={hwf}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button></div>
        {witnesses
  .filter((witness) => witness.AccountID !== id)
  .map((witness) => (
    <FriendSuggestions friendList={[witness]}/>
  ))}

       
</div>
      <h2 className='home-h2'>Find a Judge</h2>
      <div>
        <button className="slider-btn slider-btn-left"  onClick={hjfp}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button n className="slider-btn slider-btn-right" onClick={hjf}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        {judess
  .filter((jude) => jude.AccountID !== id)
  .map((jude) => (
    <FriendSuggestions friendList={[jude]}/>
  ))}
        
      </div>


      <Newsletter/>
      <Footer/>
      
    </div>
  );
};

export default Homemem;

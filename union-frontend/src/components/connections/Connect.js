import React, {useEffect, useState} from 'react'
import FriendSuggestions from '../container/FriendSuggestions';
import AccDec from "../accdec/AccDec";
import { da } from 'date-fns/locale';

function Connect () {
  const [connections, setConnestions] = useState([]);
  const [rec, setRec] = useState([]);
  const [rec1, setRec1] = useState([]);

  const [accounts, setaccounts]=useState([]);
    const [account1, setaccount1]=useState([]);
    const [accountsacc, setaccountsacc]=useState([]);
    const [accountsacc1, setaccountsacc1]=useState([]);
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('AccountID');
  const [inti, setinti]=useState(true);
  const [inti2, setinti2]=useState(true);
  const [inti3, setinti3]=useState(true);
  const [inti4, setinti4]=useState(true);
  const [inti5, setinti5]=useState(true);
  const [dataRefreshed, setDataRefreshed] = useState(false);


  useEffect(() => {
    if(inti){
    fetch(`http://localhost:5300/api/Connection/getConnectionByReceiver/${id}`, {
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
    } setinti(false);
  },[token, id, inti, dataRefreshed]);


     const conn = Object.values(connections);
     
      //    console.log(conn);

 //filtering connectings to get accepted
     useEffect(() => {
      if(inti2){
         conn.map((item) => {
          item.forEach(element => {
            if(element.Status==='1'){
             setRec((prevRec) => [...prevRec, element.Sender]);
             setinti2(false);
           }
          });
             
         
         });
        }
     }, [rec, conn,inti2, dataRefreshed]);

 const recs = Object.values(rec);

 //console.log(rec);
//filter to get waiting
 useEffect(() => {
  if(inti3){
  const getr = () => {
    conn.map((element) => {
      element.forEach(item => {
        if (!rec1.includes(item.Sender)) {
        if(item.Status==='0'){
        setRec1((prevRec1) => [...prevRec1, item.Sender]);
        setinti3(false);
      }
    }
      });
      
    });
  };
  getr();
}
}, [conn, rec1, inti3, dataRefreshed]);


const recs1 = Object.values(rec1);

 
useEffect(() => {
  if(accounts.length<recs.length){
   // console.log(accounts.length+" "+recs.length);
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
  })}
  },[accounts,recs, dataRefreshed]);

  //console.log(accounts);

  useEffect(() => {
    if(accountsacc.length<recs1.length){
    //  console.log(accountsacc.length+" "+recs1.length);

    //  console.log(5);
    recs1.map((item) => {
      if(!accountsacc.includes(item)){
    fetch(`http://localhost:5300/api/auth/getAccount/${item}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
       },
     }).then((res) => {
       return res.json();
     }).then((data)=> setaccountsacc((accountsacc) => [...accountsacc, data]))
     .catch((err) => {
       console.log(err);
     });}
    })}
    },[accountsacc, recs1, dataRefreshed]);

  //  console.log(accountsacc);
    
    //filtering through accepted

   useEffect(() => {
  if(inti4){
  const getr1 = () => {
    accounts.forEach((item) => {
      if (!account1.includes(item)) {
        setaccount1((account1) => [...account1, item]);
        setinti4(false);
    }
    });
  };
  getr1();
}
}, [accounts, account1, inti4, dataRefreshed]);
   


  useEffect(() => {
    if(inti5){
      accountsacc.forEach((item) => {
        if (!accountsacc1.includes(item)) {
          setaccountsacc1((accountsacc1) => [...accountsacc1, item]);
          setinti5(false);
      }
      });
    }
  },[accountsacc, accountsacc1, inti5, dataRefreshed] );
     

 
 const [uniqueAccounts, setunique]=useState([]);
 const [uniqueAccountsAcc, setuniqueacc]=useState([]);

 useEffect(() => {

  if(account1.length!==0){
 //removing duplicates from account1
 setunique(account1.filter((item, index) => {
  return account1.findIndex((acc) => acc.AccountID === item.AccountID) === index;
}));
  }

  if(accountsacc1.length!==0){
// removing duplicates from accountsacc1
 setuniqueacc(accountsacc1.filter((item, index) => {
  return accountsacc1.findIndex((acc) => acc.AccountID === item.AccountID) === index;
}));
  }
 },[account1,accountsacc1, dataRefreshed]);

 //console.log(uniqueAccounts);
// console.log(uniqueAccountsAcc);


const refreshData = () => {
  setDataRefreshed((prevDataRefreshed) => !prevDataRefreshed);
};
  return (
    <div>
      <div>
        <h2 style={{marginLeft:'20%', marginTop:'2%'}}>
            Connection Requests
        </h2>
        {uniqueAccountsAcc
  .filter((jude) => jude.AccountID !== id)
  .map((jude) => (
    <AccDec friendList={[jude]} refreshData={refreshData}/>
  ))}
</div>
<div>
        <h2 style={{marginLeft:'20%', marginTop:'2%'}}>
            Connections
        </h2>

        {uniqueAccounts
  .filter((jude) => jude.AccountID !== id)
  .map((jude) => (
    <FriendSuggestions friendList={[jude]} page={"connect"} refreshData={refreshData}/>
  ))}
</div>
    </div>
  )
}
export default Connect;
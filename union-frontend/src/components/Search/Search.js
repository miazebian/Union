import React, {useEffect, useState} from 'react'
import FriendSuggestions from '../container/FriendSuggestions';

function Search() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("AccountID");
    const keyword = localStorage.getItem("search");
    const [respsone,setresponse]=useState([]);
    const [allres,setallres]=useState([]);


    useEffect(() => {
        fetch(`http://localhost:5300/api/Search/SearchBar/${keyword}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => setresponse((respsone) => [...respsone, data]))
          .catch((err) => {
            console.log(err);
          });
      }, [token, respsone,keyword]);


useEffect(() => {
            if(respsone.length!==0|| respsone[0]!==undefined){
              respsone.map((item) => {
console.log(item);
                if(item.judge!==undefined && item.judge.length!==0){
                    item.judge.map((item) => {
                        setallres((res) => [...res, item])
                    })
                }
                
                if(item.witness!==undefined  && item.witness.length!==0){
                    item.witness.map((item) => {
                        setallres((res) => [...res, item])
                    })
                }
                
                if(item.member!==undefined  && item.member.length!==0){
                    item.member.map((item) => {
                        setallres((res) => [...res, item])
                    })
                }

              });
            }
          },[respsone]);

          useEffect(() => {
          
            if(allres.length!==0){
          // removing duplicates from accountsacc1
           setallres(allres.filter((item, index) => {
            return allres.findIndex((acc) => acc.AccountID === item.AccountID) === index;
          }));
            }
           },[allres]);

          console.log(allres);
          function empty() {
            if (allres.length === 0) {
              return <p style={{ fontSize: "18px", marginLeft:'25%', marginTop:'2%' }}>No  Results</p>;
            }
          }
      
  return (
    <div>

<h2 style={{marginLeft:'20%', marginTop:'2%'}}>
        Search Results</h2>
        {empty()}
         {allres
  .filter((con) => con.AccountID !== id)
  .map((con) => (
    <FriendSuggestions friendList={[con]} />
  ))}
    </div>
  )
}

export default Search
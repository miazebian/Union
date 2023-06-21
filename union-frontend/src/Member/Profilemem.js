import React from 'react'
import NavHome from './NavHome'
import Profile from '../components/profilepic/Profile';
import { useParams } from "react-router-dom";

function Profilemem() {
  let { accountID } = useParams();


  return (
    <div>
        <NavHome/>
        <Profile accountID={accountID} />
    </div>
  )
}

export default Profilemem
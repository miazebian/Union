import React from 'react'
import NavWit from './NavWit'
import Profile from '../components/profilepic/Profile'
import { useParams } from "react-router-dom";

function Witpro() {
    let { accountID } = useParams();

  return (
    <div>
        <NavWit/>
        <Profile accountID={accountID} />
    </div>
  )
}

export default Witpro
import React from 'react'
import NavJud from './NavJudge'
import Profile from '../components/profilepic/Profile'
import { useParams } from "react-router-dom";

function ProJud() {
  let { accountID } = useParams();

  return (
    <div>
        <NavJud/>
        <Profile accountID={accountID} />
    </div>
  )
}

export default ProJud
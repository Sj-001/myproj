import React, { useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';

function Profile({balance, setbalance, username, status}) {
  var user = {
    username: username
  }
  
  useEffect(() => {
    axios.post('/api/getbalance', user)
    .then(res => {
      setbalance(res.data)
      console.log(balance)
    })
    .catch(err => {
      console.log(err)
    })

   
  }, [])

  return (
    <div>
      <h1>My Profile</h1>
      {status ? <p>{balance}</p>: <p>Login First</p> }
    </div>
  );
}

export default Profile;
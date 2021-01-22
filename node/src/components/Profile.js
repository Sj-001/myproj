import React, { useEffect } from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios';

function Profile({balance, setbalance, username}) {
  var user = {
    username: username
  }
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  useEffect(() => {
    axios.post('/api/getbalance', user, {cancelToken: source.token})
    .then(res => {
      setbalance(res.data)
      console.log(balance)
    })
    .catch(err => {
      if (axios.isCancel(err)) {
        console.log('Request canceled', err.message);
      }
      else console.log(err)
    })

    return () => {
        source.cancel()
    }
  }, [balance])

  return (
    <div>
      <h1>My Profile</h1>
      <p>{balance}</p>
    </div>
  );
}

export default Profile;
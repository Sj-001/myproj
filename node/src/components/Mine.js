import React, {useEffect, useState} from 'react';
import NavbarComponent from './NavbarComponent';
import axios from 'axios'

function Mine({status}) {
  const [mempool, setmempool] = useState([])
  useEffect(() => {
    axios.get('/api/get_mempool')
      .then(res => {
        setmempool(res.data)
        console.log(res.data)
      })

  }, [])

  function renderTableHeader(){
    let keys = Object.keys(mempool[0][1])
    keys = ["Txn_Hash", ...keys, "Pick"]
    return keys.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
  }


  const transactions = mempool.map((txn, index) => {
    console.log(txn) 
    return(
      <tr key={index}>
        <td>{txn[0]}</td>
        <td>{txn[1].sender}</td>
        <td>{txn[1].recipient}</td>
        <td>{txn[1].txn_time}</td>
        <td>{txn[1].amount}</td>
        <td>{txn[1].fee}</td>
        <td><input type="checkbox"/></td>
      </tr>
    )
  })
  return (
    <div>
      <h1>Memory Pool</h1>
      {mempool.length ? 
      <table id="transactions">
        <tbody>
          <tr id="header">{renderTableHeader()}</tr>
          {transactions}
        </tbody>
      </table> : <h1>No transactions</h1>}
      
    </div>
  );
}

export default Mine;
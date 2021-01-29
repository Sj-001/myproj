import React, {useState, useEffect} from 'react';
import NavbarComponent from './NavbarComponent';
import { Card, Button, Modal } from "react-bootstrap";
import axios from 'axios';
import { clearCache } from 'clear-cache';

function Notifications({username}) {
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const [response, setresponse] = useState([])
  const handleCloseAccept = () => setShowAccept(false);
  const handleShowAccept = () => setShowAccept(true);

  const handleCloseReject = () => setShowReject(false);
  const handleShowReject = () => setShowReject(true);
  const [notifications, setnotifictions] = useState([])
  const [password, setpassword] = useState("")
  var user = {
    username: username
  }
  

  useEffect(() => {
    const fetchnoti = async () => {
      await axios.post('/api/getnoti', user)
        .then(res => {
          
          setnotifictions(res.data)
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      
    }
    
    fetchnoti();
  }, [])
  
  
  function accept(noti){
    var param = {
      noti: noti,
      password: password
    }
    axios.post('/api/accepttxn', param)
      .then(res => {
        console.log(res)
        setresponse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  
  function reject(noti){
    var param = {
      noti: noti,
      password: password
    }
    axios.post('/api/rejecttxn', param)
      .then(res => {
        console.log(res)
        setresponse(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  

  const notis = notifications.map((noti) => {
    console.log(noti)
    return(
      <Card key={noti.id}>
        <Card.Body>
          <Card.Text>
            Sender: {noti.info.sender}
          </Card.Text>
          <Card.Text>
            Amount: {noti.info.amount}
          </Card.Text>
          <Card.Text>
            {noti.info.message ? <div>Message: {noti.info.message}</div> : null}
          </Card.Text>
          <Button variant="primary" onClick={()=>{
            handleShowAccept(); 
            setresponse([]); 
            setpassword("");
            }}>Accept</Button>
          <div>
            <Modal show={showAccept} onHide={handleCloseAccept}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Password to Proceed</Modal.Title>
              </Modal.Header>
              <Modal.Body><input type="password" value={password} onChange={(event) => setpassword(event.target.value)}/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  handleCloseReject();
                  clearCache();
                  }}>
                  Close
                </Button>
                <Button variant="success" onClick={() => {accept(noti)}}>
                  Proceed to Accept
                </Button>
                {response}
              </Modal.Footer>
            </Modal>
          </div>
          <Button variant="danger" onClick={()=>{
            handleShowReject();
            setresponse([]); 
            setpassword("");
            }}>Reject</Button>
          <div>
            <Modal show={showReject} onHide={handleCloseReject}>
              <Modal.Header closeButton>
                <Modal.Title>Enter Password to Proceed</Modal.Title>
              </Modal.Header>
              <Modal.Body><input type="password" value={password} onChange={(event) => setpassword(event.target.value)}/></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  handleCloseReject();
                  clearCache();
                  }}>
                  Close
                </Button>
                <Button variant="danger" onClick={() => {reject(noti)}}>
                  Proceed to Reject
                </Button>
                {response}
              </Modal.Footer>
            </Modal>
          </div>
        </Card.Body>
      </Card>
    )

  })

  return (
    <div>
      {notis.length ? <div>{notis}</div> : <h1>No new notifications</h1>}
    </div>
  );
}

export default Notifications;
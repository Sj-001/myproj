import React, {useState, useEffect} from 'react';
import NavbarComponent from './NavbarComponent';
import { Card, Button, Modal } from "react-bootstrap";
import axios from 'axios';

function Notifications({username}) {
  const [show, setShow] = useState(false);
  const [response, setresponse] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [notifications, setnotifictions] = useState([])
  const [password, setpassword] = useState("")
  var user = {
    username: username
  }
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    const fetchnoti = async () => {
      await axios.post('/api/getnoti', user, {cancelToken: source.token})
        .then(res => {
          console.log(res)
          setnotifictions(res.data)
        })
        .catch(err => {
          if (axios.isCancel(err)) {
            console.log('Request canceled', err.message);
          }
          else console.log(err)
        })
      
    }
    
    fetchnoti();

    return () => {
        source.cancel()
    }
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

  function accepttxn(noti){
    handleShow(); 
            
            
            setresponse([]); 
            setpassword("");
    return(
      <div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Password to Proceed</Modal.Title>
          </Modal.Header>
          <Modal.Body><input type="password" value={password} onChange={(event) => setpassword(event.target.value)}/></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={() => {accept(noti)}}>
              Proceed to Accept
            </Button>
            {response}
          </Modal.Footer>
        </Modal>
      </div>
    );
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

  function rejecttxn(noti){
    handleShow();
            
            
    setresponse([]); 
    setpassword("");
    return(
      <div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Password to Proceed</Modal.Title>
          </Modal.Header>
          <Modal.Body><input type="password" value={password} onChange={(event) => setpassword(event.target.value)}/></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => {reject(noti)}}>
              Proceed to Reject
            </Button>
            {response}
          </Modal.Footer>
        </Modal>
      </div>
    );
    
  }

  const notis = notifications.map((noti) => {
    return(
      <Card key={noti.id}>
        <Card.Body>
          <Card.Text>
            Sender: {noti.sender}
          </Card.Text>
          <Card.Text>
            Amount: {noti.amount}
          </Card.Text>
          <Card.Text>
            {noti.message ? <div>Message: {noti.message}</div> : null}
          </Card.Text>
          <Button variant="primary" 
          onClick={
             
            accepttxn(noti)
            
            
            
          }>Accept</Button>
          <Button variant="danger" 
          onClick={
            
            rejecttxn(noti)
            
            
            
          }>Reject</Button>

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
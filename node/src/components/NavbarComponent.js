import React, { Component, useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button, ToggleButton, Collapse, Modal } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.css'
import axios from 'axios'
import { CopyToClipboard } from 'react-copy-to-clipboard';


function NavbarComponent({ username, setusername, status}) {
  const [showsignup, setShowsignup] = useState(false);
  const [showlogin, setShowlogin] = useState(false);

  const [KeyPhrase, setKeyPhrase] = useState("");
  const handleClosesignup = () => setShowsignup(false);
  const handleShowsignup = () => setShowsignup(true);
  const handleCloselogin = () => setShowlogin(false);
  const handleShowlogin = () => setShowlogin(true);

  const [response, setresponse] = useState([])
  const [copied, setcopied] = useState(false)
  var user1 = {
    username: username
  }
  function setuser(event) {
    localStorage.setItem( 'username', event.target.value );

    setusername(event.target.value)
  }

  function add_node(event) {
    event.preventDefault();
    setcopied(false)
    setresponse([])
    axios.post("/api/add_node", user1)
      .then(res => {
        console.log(res)
        setresponse(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }



  function logout(event) {
    event.preventDefault()
    axios.post("/api/logout", user1)
      .then(res => {
        
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    setusername("")
    setKeyPhrase("")
    setresponse([])
    handleCloselogin();
    handleClosesignup();
  }
  var user2 = {
    username: username,
    KeyPhrase: KeyPhrase
  }
  function loginuser(event) {
    event.preventDefault()
    setresponse([])
    setKeyPhrase("")
    axios.post("/api/login", user2)
      .then(res => {
        console.log(res)
        setresponse(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#">Ohlalaaaaaaaaa</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="./home">Home</Nav.Link>
            <Nav.Link href="./mine">Mine</Nav.Link>
            <Nav.Link href="./addTransaction">Add Transaction</Nav.Link>
            <Nav.Link href="./viewNetwork">View Network</Nav.Link>
            <Nav.Link href="./notifications">Notifications</Nav.Link>
            <Nav.Link href="./profile">Profile</Nav.Link>
          </Nav>
          <Nav style={{ margin: '10px' }}>
            <i className="fa fa-search" style={{ position: 'absolute', marginTop: '7px', marginLeft: '5px' }} />
            <input type="text" placeholder="Search" style={{ paddingLeft: '20px' }} />
          </Nav>
          <Nav>
            {status ? <div>
              <i className="fa fa-user fa-3x" aria-hidden="true" onClick={logout}></i>
              <h3>{username}</h3>
            </div> :
              <div className="row">
                <div>
                  <Button variant="outline-primary" className="text-center" style={{ margin: '10px' }} 
                  onClick={() => {
                    handleShowsignup(); 
                    setusername("");
                    }
                  }>Sign Up</Button>

                  <Modal show={showsignup} onHide={handleClosesignup}>
                    <Modal.Header closeButton>
                      <Modal.Title>JOIN NETWORK</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><input type="text" placeholder="Username" value={username} onChange={setuser} /></Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClosesignup}>
                        Close
                      </Button>
                      <Button type="submit" className="text-center" variant="primary" onClick={add_node}>Join Network</Button>
                      
                      <h3>{response.result}</h3>
                      {response.added ?
                        <div>
                          <CopyToClipboard text={response.result}
                            onCopy={() => setcopied(true)}>
                            <button>Copy to clipboard</button>
                          </CopyToClipboard>
                          {copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
                          <Button variant="success"><a href="/home">Proceed</a></Button>
                        </div> : <p>Already have an account?<a href="#" onClick={() => { handleShowlogin(); handleClosesignup(); setresponse([]); setKeyPhrase(""); setusername("") }}>Log In</a></p>}

                    </Modal.Footer>
                  </Modal>

                </div>
                <div>
                  <Button variant="outline-primary" className="text-center" style={{ margin: '10px' }} 
                  onClick={() => {
                    handleShowlogin();
                    setusername("");
                    }
                  }>Log In</Button>
                  <Modal show={showlogin} onHide={handleCloselogin}>
                    <Modal.Header closeButton>
                      <Modal.Title>PEER LOGIN</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input type="text" placeholder="Username" value={username} onChange={setuser} />
                      <input type="text" placeholder="KeyPhrase" value={KeyPhrase} onChange={(event) => setKeyPhrase(event.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloselogin}>
                        Close
                      </Button>
                      <Button type="submit" className="text-center" variant="primary" onClick={loginuser}>Login</Button>
                      
                      <h3>{response.result}</h3>
                      {response.loggedin ?
                        <div>
                          <Button variant="success"><a href="/home">Proceed</a></Button>
                        </div> : <p>Don't have an account?<a href="#" onClick={() => { handleShowsignup(); handleCloselogin(); setresponse([]); setusername("") }}>Sign up</a></p>}

                    </Modal.Footer>
                  </Modal>
                </div>

              </div>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    </div>
  );

}

export default NavbarComponent;
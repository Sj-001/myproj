import React, {useState, useEffect} from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from './NavbarComponent';
import { Form, FormControl, Button } from 'react-bootstrap';

import axios from 'axios'


function Home({username, setusername}) {
  const [response, setresponse] = useState([])
  
  function setuser(event){
    setusername(event.target.value)
  }
  
  function add_node(event){
    event.preventDefault();
    var user={
      username:username
    }
    axios.post("/api/add_node", user)
      .then(res=>{
        console.log(res)
        setresponse(res.data)
      })
      .catch(err=>{
        console.log(err)
      })
    
  }

  return (
    <div>
      <NavbarComponent />
      <Form>
      <FormControl type="text" placeholder="Username" value={username} onChange={setuser}/>
      <Button type="submit" className="text-center" variant="primary" onClick={add_node}>Join Network</Button>
      </Form>
      <h3 style={{color: 'white'}}>{response}</h3>
    </div>
  );
  
}

export default Home; 
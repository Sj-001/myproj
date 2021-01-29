import imagePath from './components/images/olala.png'
import axios from 'axios'
import './App.css';
import {useState, useEffect} from 'react';
import Home from './components/Home';
import NavbarComponent from './components/NavbarComponent';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Mine from './components/Mine';
import AddTransaction from './components/AddTransaction';
import ViewNetwork from './components/ViewNetwork';
import Profile from './components/Profile';
import Notifications from './components/Notifications';

function App() {
  const [username, setusername] = useState(localStorage.getItem( 'username' ) || "");
  const [balance, setbalance] = useState(localStorage.getItem( 'balance' ) || 500);
  const [status, setstatus] = useState(localStorage.getItem( 'status' ) || false)
  var user={
    username: username
  }

  

  useEffect(() => {
    axios.post("/api/getstatus",user)
    .then(res => {
      setstatus(res.data)
      console.log(status)
    })
    .catch(err => {
      console.log(err)
    })

   
  }, [])


  const home = () => {
    return(
       <Home />
    );
  }
  const mine = () => {
    return(
      <Mine status={status}/>
    );
  }
  const addTransaction = () => {
    return(
      <AddTransaction username = {username} status = {status}/>
    );
  }
  const viewNetwork = () => {
    return(
      <ViewNetwork />
    );
  }
  const profile = () => {
    return(
      <Profile balance={balance} setbalance={setbalance} username = {username} status={status}/>
    );
  }
  const notifications = () => {
    return(
      <Notifications username = {username}/>
    );
  }

  

  

  return (
    // <div className="App" style={{backgroundImage: `url(${imagePath})`}}>
      <div className="App">
        <NavbarComponent username={username} setusername={setusername} status={status} />
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={home} />
            <Route path="/mine" component={mine} />
            <Route path="/addTransaction" component={addTransaction} />
            <Route path="/viewNetwork" component={viewNetwork} />
            <Route path="/profile" component={profile} />
            <Route path="/notifications" component={notifications} />

            <Redirect to="/home" />
          </Switch>

        </BrowserRouter>
        
      </div>
  );
}

export default App;

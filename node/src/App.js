import imagePath from './components/images/olala.png'

import axios from 'axios'
import './App.css';
import {useState} from 'react';
import Home from './components/Home';
import NavbarComponent from './components/NavbarComponent';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import Mine from './components/Mine';
import AddTransaction from './components/AddTransaction';
import ViewNetwork from './components/ViewNetwork';
import Profile from './components/Profile';
import Notifications from './components/Notifications';

function App() {
  const [username, setusername] = useState("");
  const [balance, setbalance] = useState(500);
  const home = () => {
    return(
       <Home username={username} setusername={setusername}/>
    );
  }
  const mine = () => {
    return(
      <Mine />
    );
  }
  const addTransaction = () => {
    return(
      <AddTransaction />
    );
  }
  const viewNetwork = () => {
    return(
      <ViewNetwork />
    );
  }
  const profile = () => {
    return(
      <Profile />
    );
  }
  const notifications = () => {
    return(
      <Notifications />
    );
  }

  return (
    <div className="App" style={{backgroundImage: `url(${imagePath})`}}>
      

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

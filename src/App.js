import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Flights from './components/Flights';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import About from './components/About';
import Contact from './components/Contact';
import ShoppingCart from './components/ShoppingCart';
import AddFlight from './components/AddFlight';
import DeleteFlight from './components/DeleteFlight';
import UpdateFlight from './components/UpdateFlight';
import Tickets from './components/Tickets';
import Checkout from './components/Checkout';
import Users from './components/Users';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/cart' Component={ShoppingCart} />
          <Route path='/about' Component={About} /> 
          <Route path='/contact' Component={Contact} /> 
          <Route path='/flights' Component={Flights} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
          <Route path='/add' Component={AddFlight} />
          <Route path='/update' Component={UpdateFlight} />
          <Route path='/delete' Component={DeleteFlight} />
          <Route path='/tickets' Component={Tickets} />
          <Route path='/checkout' Component={Checkout} />
          <Route path='/users' Component={Users} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Flights from './components/Flights';
import Login from './components/Login';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(
    sessionStorage.getItem('loggedIn') == 'true' || false
  );
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true);
  };

  return (
    <Router>
      <div>
        <NavLink to='/flights'>Flights</NavLink>
      </div>
      <Routes>
          <Route path='/flights' Component={props => (
            <Flights {...props} loggedIn={loggedIn} />
          )} />
          <Route path='/login' Component={props => (
            <Login {...props} login={login} />
          )} />
      </Routes>
    </Router>
  );
}

export default App;

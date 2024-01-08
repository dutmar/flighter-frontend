import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Flights from './components/Flights';
import Login from './components/Login';

function App() {
  const[loggedIn, setLoggedIn] = React.useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <NavLink to='/flights'>Flights</NavLink>
      </div>
      <Routes>
          <Route path='/flights' render={props => (
            <Flights {...props} loggedIn={loggedIn} />
          )} />
          <Route path='/login' render={props => (
            <Login {...props} login={login}/>
          )} />
      </Routes>
    </Router>
  );
}

export default App;

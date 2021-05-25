import React from 'react';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import NavBar from './NavBar';

import { Route, Redirect } from 'react-router-dom';

function App() {
  return (
    <div>
      <NavBar />
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </div>
  );
}

export default App;

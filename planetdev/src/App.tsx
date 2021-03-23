import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Auth, { LOGIN_PATH } from './routes/Auth';
import Dashboard, { DASHBOARD_PATH } from './routes/Dashboard';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <Router>
        <Switch>
          <Route path={LOGIN_PATH}>
            <Auth/>
          </Route>
          <Route path={DASHBOARD_PATH}>
            <Dashboard/>
          </Route>
          <Route path="/">
            <Redirect to={DASHBOARD_PATH}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

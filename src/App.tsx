import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core/styles";

import Header from './routes/Header';
import Auth, { LOGIN_PATH } from './routes/Auth';
import Dashboard, { DASHBOARD_PATH } from './routes/Dashboard';
import Main, { MAIN_PATH } from './routes/Main';
import Coding, { CODING_PATH } from './routes/Coding';
import Voyage, { VOYAGE_PATH } from './routes/Voyage';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
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
            <Route path={MAIN_PATH}>
              <Header>
                <Main/>
              </Header>
            </Route>
            <Route path={CODING_PATH}>
              <Header>
                <Coding/>
              </Header>
            </Route>
            <Route path={VOYAGE_PATH}>
              <Header>
                <Voyage/>
              </Header>
            </Route>
            <Route path="/">
              <Redirect to={MAIN_PATH}/>
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;

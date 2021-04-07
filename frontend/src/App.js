import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginPage from './LoginPage/LoginPage.jsx';
import MainPage from './MainPage/MainPage.jsx'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';




function App() {
  
  return (
    
    <div className = "App">
    <Router>
    <Switch>
      
      <Route path ="/" exact component={LoginPage}/>
      <Route path ="/main" exact component={MainPage}/>
      <Route path ="/main/game" exact component={MainPage}/>
      
    </Switch>

    </Router>
    
    </div>
  );
}

export default App;

import FirePage from './pages/UpdatedFirePage';
import CovidPage from './pages/UpdatedCovidPage';
import LoginPage from './pages/loginpage';
import AdminPage from './pages/adminpage';
import MapPage from './pages/mapPage'
import {PrivateRoute} from './pages/privateroute'
import SignUp from './components/SignUp';
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect} from 'react-router-dom';
import {withCookies} from 'react-cookie';
//import { Switch, Grid, Typography, Button, Paper} from "@material-ui/core";
//import { ThemeProvider, createMuiTheme } from "@material-ui/core";
//import { ThemeContext } from './components/DarkMode/theme-context';

function App() {
  //const { theme, toggle, dark } = React.useContext(ThemeContext)
  //const {darkMode, setDarkMode} = useState(false);

 // const theme = createMuiTheme({
    //palette: {
     // type: darkMode ? "dark" : "light",
   // },
  //});



  return (
    <div className="App">
      <div className="disclaimer">SFSU Software Engineering Project CSC 648-848, Fall 2020. For Demonstration Only&nbsp;
        <a className = "disclaimer" href = 'http://portfolioaboutpage-env.eba-qz5xmt46.eu-west-3.elasticbeanstalk.com/'>About Us</a>
      </div>
      <Switch>
        <Route path = "/" component = {MapPage} exact/>
        <Route path = "/signup" component = {SignUp} exact />
        <Route path = "/login" component = {LoginPage} exact/>
        <PrivateRoute path = "/Fire" component = {FirePage}/>
        <PrivateRoute path = "/Covid" component = {CovidPage}/>
        <PrivateRoute path = "/Admin" component = {AdminPage}/>
        <Redirect from = "*" to = "/"/>
      </Switch>

    </div>
  );
}

export default withCookies (App);

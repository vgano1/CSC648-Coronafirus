
<<<<<<< HEAD

import FirePage from './pages/UpdatedFirePage';
import CovidPage from './pages/UpdatedCovidPage';
=======
import UpdatedFirePage from './pages/UpdatedFirePage';
import CovidPage from './pages/covidpage';
>>>>>>> 36188dc31fa706f39b7f2af3bafcc2ff237a9516
import LoginPage from './pages/loginpage';
import AdminPage from './pages/adminpage';
import {PrivateRoute} from './pages/privateroute'
import SignUp from './components/SignUp';


import { useState, useEffect } from 'react';
import { Switch, Route, Link, Redirect} from 'react-router-dom';
function App() {

  // const [type, setType] = useState("Covid");
  // const handleClick = () => {
  //   if (type === "Covid")
  //     setType("Fire")
  //   else
  //     setType("Covid")
  // };

  // const handleDisplay = () => {
  //   if (type === "Covid") {
  //     return (
  //       <div>
  //         <CountyAlertSubmit></CountyAlertSubmit>
  //         <br/>
  //         <br/>
  //         <CountyDataEdit></CountyDataEdit>
  //         <br/>
  //         <br/>
  //         <CountyMain></CountyMain>
  //       </div>
  //     );
  //   }
  //   else if (type === "Fire") {
  //     return (
  //       <div>
  //         <FireAlertSubmit></FireAlertSubmit>
  //         <br/>
  //         <br/>
  //         <FireDataEdit></FireDataEdit>
  //         <br/>
  //         <br/>
  //         <FireMain></FireMain>
  //       </div>
  //     );
  //   }
  // };
  //move to return if needed
  // <input onClick={handleClick} type="checkbox" class="type" id="type"></input>
  // <label for="type">Covid/Fire</label>
  // {handleDisplay()}
//took out to test
//   <nav>
//   <Link to = "/Fire">Fire</Link>
//   <Link to = "/Covid">Covid</Link>
// </nav>

  return (
    <div className="App">

      <Switch>
        <Route path = "/" exact />
        <PrivateRoute path = "/Fire" component = {FirePage}/>
        <Route path = "/signup" component = {SignUp} exact />
        <PrivateRoute path = "/Covid" component = {CovidPage}/>
        <PrivateRoute path = "/Admin" component = {AdminPage}/>
        <Route path = "/login" component = {LoginPage} exact/>
        <Redirect from = "*" to = "/"/>
      </Switch>

    </div>
  );
}

export default App;

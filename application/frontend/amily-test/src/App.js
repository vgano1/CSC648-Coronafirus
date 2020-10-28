import CountyAlertSubmit from './components/countyAlertSubmit';
import CountyDataEdit from './components/countyDataEdit';
import CountyMain from './components/countyMain';
import FireAlertSubmit from './components/fireAlertSubmit';
import FireDataEdit from './components/fireDataEdit';
import FireMain from './components/fireMain';

import FirePage from './pages/firepage';
import CovidPage from './pages/covidpage';

import { useState, useEffect } from 'react';
import { Switch, Route, Link} from 'react-router-dom';
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

  return (
    <div className="App">
      <nav>
        <Link to = "/Fire">Fire</Link>
        <Link to = "/Covid">Covid</Link>
      </nav>
      <Switch>
        <Route path = "/Fire" component ={FirePage}/>
        <Route path = "/Covid" component ={CovidPage}/>
      </Switch>

    </div>
  );
}

export default App;

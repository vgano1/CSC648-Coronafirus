import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Secret from './Secrets';
import FrontEndTemplate from './pages/FrontEndTemplate';

function App() {

  var defaultCovid = [
    {
      "countie": "San Francisco",
      "latitude": 33.93911,
      "longitude": 67.70995,
      "Confirmed": 51995,
      "Deaths": 1756,
      "Recovered": 36482,
      "Active": 13757
    }
  ];

  var defaultFire = [
    {
      "incident_name": "Sand Fire",
      "incident_county": "Amador, El Dorado",
      "incident_location": "East of Highway 49, 5 miles north of Plymouth",
      "incident_acres_burned": 4240,
      "incident_containment": 100,
      "incident_cooperating_agencies": "CAL FIRE Amador-El Dorado Unit, CHP, El Dorado Co SO, Amador SO, Cal OES, CDCR, El Dorado Co Animal Control, USFS, BLM, El Dorado Co DOT, CCC, Red Cross, PG&E, Cal Trans",
      "latitude": 38.5691,
      "longitude": -120.7819
    }
  ];

  const [results, setResults] = React.useState(null);
  const [mode, setMode] = React.useState(false); // true for Wildfire, false for Covid

  const fetchFireData = () => {
    // utility to get all data
    setMode(true);
    
    /*
    var input = document.getElementById("myInput").value;
    if (!input) {
      axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/wildfire/counties')
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch(() => {
        setResults(null);
      });
    }
    else {
      filterFunction(selected);
    }
    */
  };
  
  const fetchCoronaData = () => {
    // utility to get all data

    setMode(false);
    /*
    var input = document.getElementById("myInput").value;
    if (!input) {
      axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/coronavirus/counties')
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch(() => {
        setResults(null);
      });
    } else {
      filterFunction(selected);
    }
    */
  };

  return (
    <Router>
      <div> {/*
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
      </nav>  */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch> {/*
          <Route path="/covid">
            <CovidPage />
          </Route>
          <Route path="/wildfires">
            <WildfirePage />
        </Route> */}
          <Route path="/">
            <FrontEndTemplate />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

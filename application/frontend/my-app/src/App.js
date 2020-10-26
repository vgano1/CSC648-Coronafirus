import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

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
    var input = document.getElementById("myInput").value;
    if (!input) {
      axios.get('http://localhost:5000/wildfire/counties')
        .then((res) => {
          console.log(res);
          setResults(res.data);
        })
        .catch(() => {
          setResults(null);
        });
    }
    else {
      axios.get('http://localhost:5000/wildfire/countie/' + input)
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch(() => {
        setResults(null);
      });
    }
  };
  
  const fetchCoronaData = () => {
    // utility to get all data

    setMode(false);
    var input = document.getElementById("myInput").value;
    if (!input) {
      axios.get('http://localhost:5000/coronavirus/counties')
        .then((res) => {
          console.log(res);
          setResults(res.data);
        })
        .catch(() => {
          setResults(null);
        });
    }
    else {
      axios.get('http://localhost:5000/coronavirus/countie/' + input)
      .then((res) => {
        console.log(res);
        setResults(res.data);
      })
      .catch(() => {
        setResults(null);
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Coronafirus!</h1>
        <h2>Created by Team 1, CSC 648, Section</h2>

        <h2>Search/Filter Dropdown</h2>
        <p>Click on the button to open the dropdown menu, and use the input field to search for a specific dropdown link.</p>

        <div className="dropdown">
          <button onClick={myFunction} className="dropbtn">Dropdown</button>
          <div id="myDropdown" className="dropdown-content">
            <input type="text" placeholder="Search.." id="myInput" />
              <div onClick={fetchCoronaData}>Corona</div>
              <div onClick={fetchFireData}>Wildfire</div>
          </div>
        </div>
      </header>


      <div className="resultPage grid-container">
        {results && mode &&
          results.map((item, index) => {
            return (
              <div className="item grid-item" key={index}>
                <h3>{item.incident_name}</h3>
                <h4>{item.incident_county}</h4>
                <p>Acres burned: {item.incident_acres_burned}</p>
                <p>Containment: {item.incident_acres_burned}</p>
                <p>Cooperating Agencies: {item.incident_cooperating_agencies}</p>
              </div>
            )
          })}

        
        {results && !mode &&
          results.map((item, index) => {
            return (
              <div className="item grid-item" key={index}>
                <h3>{item.Admin2}</h3>
                <h4>Confirmed Cases: {item.Confirmed}</h4>
                <p>Recovered: {item.Recovered}</p>
                <p>Active: {item.Active}</p>
                <p>Deaths: {item.Deaths}</p>
              </div>
            )
          })}
      </div>

    </div>
  );
}

export default App;

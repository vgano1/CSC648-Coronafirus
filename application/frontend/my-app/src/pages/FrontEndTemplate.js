import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import './template.css';
import './style.css';
import MapView from '../components/MapView.js';
import DataView from '../components/DataView.js';
import Secret from '../Secrets';

//debug
import defaultFire from '../testData/testData.json'

function FrontEndTemplate() {
    const [results, setResults] = React.useState(null);
    const [mode, setMode] = React.useState(true); // true for Wildfire, false for Covid
    const [selected, setSelected] = React.useState(null);
  
    const filterFunction = (i) => {
      var input;
      if(!i) {
        input = selected.toLowerCase();
      } else {
        input = i.toLowerCase();
      }
      //var mode = document.getElementById("myDropdown").value;
      console.log(mode)
      if (!mode) {
        axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/coronavirus/countie/' + input)
        .then((res) => {
          console.log(res);
          setResults(res.data);
        })
        .catch(() => {
          setResults(null);
        });
      }
      else {
        // setResults(defaultFire);
        
        axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/wildfire/countie/' + input)
        .then((res) => {
          console.log(res);
          setResults(res.data);
        })
        .catch(() => {
          setResults(defaultFire);
        });
        
      }
    }

    return (
        <div className="wrapper">
            <div className="main-head">Coronafirus</div>
            <div className="map">
                <MapView mapsSecret={Secret.GoogleMaps.ApiKey} filterFunction={filterFunction} setSelected={setSelected}/>
            </div>
            <div className="side">
                <DataView results={results} mode={mode}/>
            </div>
            <div className="main-footer">SFSU Software Engineering Project CSC 648-848, Fall 2020. For Demonstration Only</div>
        </div>
    );
}

export default FrontEndTemplate;
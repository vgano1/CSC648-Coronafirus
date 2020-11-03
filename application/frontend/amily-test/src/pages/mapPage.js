import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import '../styles/frontendTemplate.css';
import '../styles/listStyle.css';
import ToggleSwitch from '../components/ToggleSwitch.js';
import MapView from '../components/MapView.js';
import DataView from '../components/DataView.js';
import Secret from '../data/Secrets';

function MapPage() {
    const [results, setResults] = React.useState(null);
    const [mode, setMode] = React.useState(true); // true for Wildfire, false for Covid
    const [selected, setSelected] = React.useState(null);

    React.useEffect(() => {
      if(selected) {
      filterFunction(selected);
      }
    }, [selected]);

    React.useEffect(() => {
      if(selected) {
        filterFunction(selected);
      }
    }, [mode]);

    const checkbox = () => {
      setMode(!mode);
    }
  
    async function filterFunction(i) {
      var input;
      if(!i) {
        input = selected.toLowerCase();
      } else {
        input = i.toLowerCase();
      }
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
        axios.get('http://ec2-15-237-111-31.eu-west-3.compute.amazonaws.com:5000/wildfire/countie/' + input)
        .then((res) => {
          console.log(res);
          setResults(res.data);
        })
        .catch(() => {
          setResults(null);
        });
      }
    }

    return (
      <div className="container">
      <div className={mode ? 'background' : 'background fade'} />
        <div className="wrapper foreground">
            <div className="main-head foreground">
              <h2>Coronafirus</h2>
              <ToggleSwitch id="toggleSwitch" checked={mode} onChange={checkbox} />
            </div>
            <div className="map foreground">
                <MapView mapsSecret={Secret.GoogleMaps.ApiKey} filterFunction={filterFunction} mode={mode} setSelected={setSelected}/>
            </div>
            <div className="side foreground">
                <DataView results={results} mode={mode}/>
            </div>
            <div className="main-footer foreground">SFSU Software Engineering Project CSC 648-848, Fall 2020. For Demonstration Only</div>
        </div>
      </div>
    );
}

export default MapPage;
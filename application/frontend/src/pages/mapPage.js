import React, { useState } from 'react';
import axios from 'axios';
import { Route, Link, Redirect } from 'react-router-dom';
import '../styles/frontendTemplate.css';
import '../styles/listStyle.css';
import MapView from '../components/MapView.js';
import DataView from '../components/DataView.js';
import Secret from '../data/Secrets.json';
import Switch from '@material-ui/core/Switch';
import { useSelector } from 'react-redux';



function MapPage() {
    const [results, setResults] = React.useState(null);
    const [caGovApi, setCaGovApi] = React.useState(null);
    const [mode, setMode] = React.useState(true); // true for Wildfire, false for Covid
    const [selected, setSelected] = React.useState(null);
    const [redirect,setRedirect] = React.useState(false);
    const [path, setPath] = React.useState("");
    const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn); //boolean
    const userType = useSelector(state => state.userReducer.userType); //String
    const information = useSelector(state => state.userReducer.information);//array

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

    const checkbox = (event) => {
      setMode(event.target.checked);
    }

    const routeChange = () => {
      setRedirect(true);
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

        axios.get('https://data.ca.gov/api/3/action/datastore_search?resource_id=28cbcbef-d7d6-4b71-b54d-453418f30d6f&q=' + input)
        .then((res) => {
          console.log(res);
          setCaGovApi(res.data);
        })
        .catch(() => {
          setCaGovApi(null);
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
  //<img src="https://i.ibb.co/Vm9jgyg/Logo.png" alt="coronalogo-cropped" width="75px"/> 
  //<img src="https://i.ibb.co/D8bG90S/Logo-Green-v2.png" alt="coronalogo-cropped" width="75px"/>
  if(!redirect){
    return (
      <div>
        <div className="container">
        <div className={mode ? 'background' : 'background fade'} />
          <div className="wrapper foreground">
              <div className="main-head foreground">
              {/* {userType === "Fire" && (<img src="https://i.ibb.co/Vm9jgyg/Logo.png" alt="coronalogo-cropped" width="75px"/>)}
              {userType === "Covid" && (<img src="https://i.ibb.co/D8bG90S/Logo-Green-v2.png" alt="coronalogo-cropped" width="75px"/>)} */}
              {mode ? <a href ='http://coronafirus.team:3001/'> <img src="https://i.ibb.co/Vm9jgyg/Logo.png" alt="coronalogo-cropped" width="75px"/></a> : <a href ='http://coronafirus.team:3001/'><img src="https://i.ibb.co/D8bG90S/Logo-Green-v2.png" alt="coronalogo-cropped" width="75px"/></a>}
              <img src="https://i.ibb.co/KrZtqF1/Coronafirus-Logo.png" alt="logo-cropped" width="300px"/>
                <Switch
                  className="rightSide"
                  checked={mode}
                  onChange={checkbox}
                  name="checkedA"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                />
                {!isLoggedIn && <button className="signUp rightSide" onClick={routeChange}>Sign Up</button>}
                {isLoggedIn && <button className="signUp rightSide" onClick={routeChange}>Dashboard</button>}
              </div>
              <div className="map foreground">
                  <MapView mapsSecret={Secret.GoogleMaps.ApiKey} selectedCounty={setSelected}/>
              </div>
              <div className="side foreground">
                  <DataView results={results} caGovApi={caGovApi} mode={mode}/>
              </div>
              <div className="main-footer foreground">SFSU Software Engineering Project CSC 648-848, Fall 2020. For Demonstration Only
              </div>
          </div>
        </div>
      </div>
    );
  } else {
      return (<Redirect to = "/signup" />);
  }

}

export default MapPage;
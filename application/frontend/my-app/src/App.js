import React, { useState } from 'react';
import axios from 'axios';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Secret from './Secrets';
import FrontEndTemplate from './pages/FrontEndTemplate';

function App() {

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

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import {BrowserRouter} from 'react-router-dom';

//import {createStore} from 'redux'; //make data store for the app
//import rootReducer from './redux/reducers/rootReducer';
//Allows components to access store via context
//import {Provider} from 'react-redux';
//create global datastore for the app

//const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


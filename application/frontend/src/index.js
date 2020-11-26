import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';

import {createStore} from 'redux'; //make data store for the app
import rootReducer from './redux/reducers/rootReducer';
//Allows components to access store via context
import {Provider} from 'react-redux';
//create global datastore for the app
//import { ThemeProvider } from './components/DarkMode/theme-context'

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>

      <Provider  store = {store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>

    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import * as config from 'config';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './context/store';
import { Messaging } from './containers/Messaging';

import './app.css';

console.log('organizerify', config);

ReactDOM.render(
  <Router>
    <StoreProvider>
      <div>
        <ThemeProvider theme={{ accent: '#edd24e', headercolor: '#2c3e50' }}>
          <App />
        </ThemeProvider>
        <Messaging />
      </div>
    </StoreProvider>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

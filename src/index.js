import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './redux';
import thunk from 'redux-thunk';
import { CssBaseline } from '@mui/material';
import Notes from './pages/Notes';
import reportWebVitals from './reportWebVitals';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <Notes />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals();
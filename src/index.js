import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import './App.css'

import App from './App'
import { createStore } from "redux";
import { Provider } from "react-redux";
import RootRed from './Redux/index.js'

const store = createStore(RootRed);

ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
)
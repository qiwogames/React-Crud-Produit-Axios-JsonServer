import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//Ajout du router
import {BrowserRouter} from "react-router-dom";
//Ajout du système de service comme dans angular
//import * as ServiceWorker from "./ServiceWorker"

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);



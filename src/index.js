import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react';
import Main from './content';
import Login from './components/login.js';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
	  <Login />
	,document.getElementById('root'));

registerServiceWorker();

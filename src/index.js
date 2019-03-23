import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react';
import Main from './content';
import registerServiceWorker from './registerServiceWorker';

import Profile from './models/profile.js';

const profile  = Profile.create({username:'king shmeat'});

ReactDOM.render(
	<Provider profile={profile}>
	  <Main profile={profile} />
	</Provider>, document.getElementById('root'));

registerServiceWorker();

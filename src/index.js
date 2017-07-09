/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';

import App from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
// require('./favicon.ico');
// import './styles.scss';
import './index.css';

import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';
import registerServiceWorker from './registerServiceWorker';
injectTapEventPlugin();

render(
    <App />, document.getElementById('root')
);
registerServiceWorker();

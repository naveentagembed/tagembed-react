import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import store from "./store"
//import swDev from './swDev'
import * as serviceWorker from './serviceWorker';
import {getRenderContainer} from './utils/index';

ReactDOM.render(<Provider store={store}><App/></Provider>,
    //document.getElementById('root')
    getRenderContainer()
);

//swDev();
serviceWorker.register();

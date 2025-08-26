import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


ReactDOM.render(<App></App>, document.getElementById('root'));
serviceWorker.unregister();

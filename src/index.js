import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.scss';
import App from './containers/App.jsx';

import axios from 'axios'
React.$axios=axios
ReactDOM.render(<App />, document.getElementById('root'));


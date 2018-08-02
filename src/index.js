import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.scss';
import IRouter from './router.jsx';

import axios from 'axios'
React.$axios=axios
ReactDOM.render(<IRouter />, document.getElementById('root'));


import React from 'react';
import 'shared/styles/app.css';
import 'shared/styles/w3.css';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { routes } from 'shared/routes';


// In the browser, we render into a DOM node and hook up to the browser's history APIs
ReactDOM.render(<Router history={browserHistory} children={routes}/>, document.getElementById('main'));

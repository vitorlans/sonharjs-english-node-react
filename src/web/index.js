import 'shared/styles/app.scss';
import 'w3css/w3.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { Router } from 'react-router';
import routes from 'shared/routes';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';

import configureStore from 'shared/store';

const store = configureStore(window.__initState__);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(<Provider store={store}>
                {routes(history)}
            </Provider>, document.getElementById('main'));

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}
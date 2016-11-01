import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import UserReducer from './reducer-user';
import TranslateReducer from './reducer-translate';

const allReducers = combineReducers({
    user: UserReducer,
    translate: TranslateReducer,
    routing: routerReducer
});

export default allReducers;
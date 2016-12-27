import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import UserReducer from './reducer-user';
import TranslateReducer from './reducer-translate';
import AccountReducer from './reducer-account';

const allReducers = combineReducers({
    user: UserReducer,
    translate: TranslateReducer,
    account: AccountReducer,
    routing: routerReducer
});

export default allReducers;
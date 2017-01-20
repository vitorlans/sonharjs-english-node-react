import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import UserReducer from './reducer-user';
import WordReducer from './reducer-word';
import AccountReducer from './reducer-account';


const allReducers = combineReducers({
    user: UserReducer,
    word: WordReducer,
    account: AccountReducer,
    routing: routerReducer
});

export default allReducers;
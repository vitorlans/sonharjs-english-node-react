import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import UserReducer from './reducer-user';
import WordReducer from './reducer-word';

const allReducers = combineReducers({
    user: UserReducer,
    word: WordReducer,
    routing: routerReducer
});

export default allReducers;
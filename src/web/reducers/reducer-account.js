import { SET_MY_SAVED_WORDS } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  wordList: []
};

export default function(state = initialState, action){

    switch(action.type){

        case SET_MY_SAVED_WORDS:
            return Object.assign({}, state, {
                wordList: action.words
            });

        default:
            return state;
    }

}
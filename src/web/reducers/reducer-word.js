import { SET_SEARCH_WORD, CHANGE_SEARCH_WORD } from '../actions/types';

export default function(
    state = { 
        searchWord: "", 
        resultSearch: {
            word: "",
            type: "",
            transcription: "",
            soundurl: "",
            definitions: [],
            translates: [],
            images: []
        }
    }, 
    action) {
    switch (action.type) {
        case 'CHANGE_SEARCH_WORD':
            return Object.assign({}, state, {
               searchWord: action.word 
            });

        case 'SET_SEARCH_WORD':
            return Object.assign({}, state, {
                resultSearch: action.resultSearch
            });

        default:
            return state;
    }
}
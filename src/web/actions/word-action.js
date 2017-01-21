import cookie from 'react-cookie';
import {SET_SEARCH_WORD, SET_MY_SAVED_WORDS, CHANGE_SEARCH_WORD} from './types';

export function changeSearchWord(word) {
  return {type: CHANGE_SEARCH_WORD, word};
}

export function setSearchWord(data) {
  return {type: "SET_SEARCH_WORD", resultSearch: data};
}

export function setMySaved(words) {
  return {type: SET_MY_SAVED_WORDS, words};
}

export function saveWord(data) {
  return dispatch => {
    return fetch('/api/word/add', {
      method: 'post',
      body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer " + cookie.load('jwtToken')
        }
      })
      .then(handleResponse)
      .then(data => {
        dispatch(setMySaved(data));
      });
  };
}

export function removeWord(sentence) {
  return dispatch => {
    return fetch('/api/word/remove?sentence='+ sentence, {
      method: 'get',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer " + cookie.load('jwtToken')
        }
      })
      .then(handleResponse)
      .then(data => {
        dispatch(setMySaved(data));
      });
  };
}

export function fetchMyWords() {
  return dispatch => {
    return fetch('/api/word/mysaved', {
        method: 'get',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Bearer " + cookie.load('jwtToken')
        }
      })
      .then(res => res.json())
      .then(data => dispatch(setMySaved(data)));
  };
}

export function fetchSearchWord(searchWord) {
  return dispatch => {
    return fetch("/api/word?keyword=" + searchWord, {method: 'get'})
      .then(res => res.json())
      .then(data => dispatch(setSearchWord(data)));
  };
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
export const SET_MY_SAVED_WORDS = 'SET_MY_SAVED_WORDS';
export const SAVE_WORD = 'SAVE_WORD';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function setMySaved(words) {
  return {
    type: SET_MY_SAVED_WORDS,
    words
  };
}

export function saveWord(data) {
  return dispatch => {
    return fetch('/api/word/add', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        "Authorization": "Bearer ??"
      }
    }).then(handleResponse);
  };
}

export function fetchWords() {
  return dispatch => {
    fetch('/api/word/mysaved', {
        method:'get',
        body: JSON.stringify(data),
        headers: {
          "Authorization": "Bearer ??"
        }
      })
      .then(res => res.json())
      .then(data => dispatch(setMySaved(data)));
  };
}
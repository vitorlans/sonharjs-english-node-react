import cookie from 'react-cookie';
import {SET_CURRENT_USER} from './types';

export function setCurrentUser(user) {
    return {type: SET_CURRENT_USER, user};
}

export function logout(){
    return dispatch => {
        cookie.remove('jwtToken');
        dispatch(setCurrentUser({}));
    };
}


export function login(data) {
    return dispatch => {
        return fetch('/api/user/auth', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },       
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                const token = data.token;
                cookie.save('jwtToken', token);
                dispatch(setCurrentUser(data.user));
            }
        });
    };
}
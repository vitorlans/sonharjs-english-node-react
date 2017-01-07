
import { createStore, compose } from 'redux';

// import the root reducer
import allReducers from 'reducers/index';


export default function configureStore(initialState) {
    const store = createStore(
        allReducers,
        initialState
    );

    return store;
}
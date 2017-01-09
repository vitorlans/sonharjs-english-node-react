import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// import the root reducer
import allReducers from 'reducers/index';

export default function configureStore(initialState) {

    const composeEnhancers =
        process.env.NODE_ENV !== 'production' ?   
        composeWithDevTools
        : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
    );


    const store = createStore(
        allReducers,
        initialState,
        enhancer
    );

    return store;
}
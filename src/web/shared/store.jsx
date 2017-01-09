
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// import the root reducer
import allReducers from 'reducers/index';

export default function configureStore(initialState) {
    const store = createStore(
        allReducers,
        initialState,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );

    return store;
}
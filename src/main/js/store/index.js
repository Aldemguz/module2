import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import promise from "redux-promise-middleware";

import rootReducer from '../reducers';

let middleware;
if(env.MODE === "dev"){
    middleware = composeWithDevTools(applyMiddleware(promise, thunk, createLogger()));
}else{
    middleware = applyMiddleware(promise,thunk);
}

const store = createStore(rootReducer, middleware);

export default store;

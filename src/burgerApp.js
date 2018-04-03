import {BrowserRouter} from 'react-router-dom';

import {createStore,compose,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './store/RootReducers';
import thunk from 'redux-thunk';
import React from 'react';
/*import PublicRouter from './router';*/

import App from './containers/App';

const burgerApp=()=>{
    const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
}

export default burgerApp;
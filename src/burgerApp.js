import {BrowserRouter} from 'react-router-dom';

import {createStore,compose,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './store/RootReducers';
import React from 'react';
import createSagaMiddleware from 'redux-saga';
import {watchSaga} from './store/RootSaga';
import Layout from './containers/Layout/Layout';

const burgerApp=()=>{
    const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:null || compose;
    const sagaMiddleware=createSagaMiddleware();
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(watchSaga);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </Provider>
    );
}

export default burgerApp;
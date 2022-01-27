import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reduxStore/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import AppointmentsContainer from "./AppointmentsListContainer/AppointmentsContainer"

const store = createStore(rootReducer,
    applyMiddleware(thunkMiddleware)
);

const app = (
    <Provider store={store}>
        <AppointmentsContainer/>
    </Provider>
)

ReactDOM.render(
    app,
    document.getElementById('app'),
)

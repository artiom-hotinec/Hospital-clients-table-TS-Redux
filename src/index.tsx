import React from 'react';
import ReactDOM from 'react-dom';
import {setupStore} from './reduxStore/reducers/rootReducer';
import { Provider } from 'react-redux';
import { AppointmentsContainer } from './AppointmentsListContainer/AppointmentsContainer';


const store = setupStore()

const app = (
    <Provider store={store}>
        <AppointmentsContainer />
    </Provider>
)

ReactDOM.render(
    app,
    document.getElementById('app'),
)

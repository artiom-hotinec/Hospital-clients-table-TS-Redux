import {combineReducers} from 'redux';
import {AppointmentsReducer} from "./Appointments";


export default combineReducers({
    appointments: AppointmentsReducer
})


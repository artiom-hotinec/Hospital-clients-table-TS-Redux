import {RootState} from "../reduxStore/reducers/rootReducer";
import {ThunkAction} from "redux-thunk";
import {appointmentsSlice} from "../reduxStore/reducers/appointmentSlice";

export interface IDataFromService {
    id: string;
    startDate: string;
    endDate: string | Date;
    clinicianName: string;
    patient: {
        id: string;
        name: string;
    };
    status: string;
}

export interface IAppointmentObject {
    clinicianName: string
    duration: string | number
    name: string
    startDate: string
}


type ActionsAppointments = typeof appointmentsSlice.actions.updateAppointment | typeof appointmentsSlice.actions.addNewAppointment
    | typeof appointmentsSlice.actions.groupAppointment | typeof appointmentsSlice.actions.sortData

type actionsType = ReturnType<ActionsAppointments>

export interface IReturnedDispatch  {
    // (...args: any[]): (dispatch: AppDispatch, getState: () => RootState) => void,
    (...args: any[]): ThunkAction<void, RootState, unknown, actionsType>
}
import {AppDispatch, RootState} from "../reduxStore/reducers/rootReducer";

export interface IAppointments {
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

export interface IReturnedDispatch  {
    (...args: any[]): (dispatch: AppDispatch, getState: () => RootState) => void,
}
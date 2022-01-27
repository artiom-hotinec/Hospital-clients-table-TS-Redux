import {createReducer} from "typesafe-actions";

import {
    Sort_Ascending,
    Update_Appointment,
    Add_New_Appointment,
    Fetch_Appointment_Start,
    Fetch_Data_Success,
    Fetch_Data_Error, Group_Appointment
} from "../actions/actionsTypes";

export type DataFromService = {
    id: string,
    startDate: string,
    endDate: string | Date,
    clinicianName: string,
    patient: {
        id: string,
        name: string
    },
    status: string,
}

export type AppointmentStateType = Readonly<{
    dataArray: DataFromService[];
    notGroupDataArray: DataFromService[];
    isSortAscending: boolean;
    isLoading: boolean;
    error: null | string;
    clinicianNameArray: string[];
}>;

const initialState: AppointmentStateType = {
    dataArray: [],
    notGroupDataArray: [],
    isSortAscending: false,
    isLoading: false,
    error: null,
    clinicianNameArray: []
}

export const AppointmentsReducer = createReducer(initialState)
    .handleType(Fetch_Appointment_Start, (state: typeof initialState) => ({...state, isLoading: true}))
    .handleType(Fetch_Data_Success, (state: typeof initialState, action: any) => ({
        ...state,
        isLoading: false,
        clinicianNameArray: action.payload.clinicianNameArray,
        dataArray: action.payload.dataArray,
        notGroupDataArray: action.payload.dataArray,
    }))
    .handleType(Fetch_Data_Error, (state: typeof initialState, action: any) => ({
        ...state,
        isLoading: false,
        error: action.payload
    }))
    .handleType(Update_Appointment, (state: typeof initialState, action: any) => ({
        ...state,
        dataArray: action.payload,
        notGroupDataArray: action.payload
        , isSortAscending: !state.isSortAscending
    }))
    .handleType(Group_Appointment, (state: typeof initialState, action: any) => ({
        ...state,
        dataArray: action.payload
    }))
    .handleType(Add_New_Appointment, (state: typeof initialState, action: any) => ({
        ...state,
        dataArray: [...state.dataArray, action.payload.newItem],
        notGroupDataArray: [...state.notGroupDataArray, action.payload.newItem],
    }))
    .handleType(Sort_Ascending, (state: typeof initialState) => ({...state, isSortAscending: !state.isSortAscending}));


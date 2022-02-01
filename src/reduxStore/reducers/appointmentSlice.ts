import {IDataFromService} from "../../types/Appointments";
import {NO_GROUP} from "../../utils/appointmentsConstants";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAppointments} from "../actions/aciontsAppointments";


interface IAppointmentState {
    dataArray: IDataFromService[];
    notGroupDataArray: IDataFromService[];
    isSortAscending: boolean;
    isLoading: boolean;
    error: null | string;
    clinicianNameArray: string[];
    groupBy: string;
}

const initialState: IAppointmentState = {
    dataArray: [],
    notGroupDataArray: [],
    isSortAscending: false,
    isLoading: false,
    error: null,
    clinicianNameArray: [],
    groupBy: NO_GROUP
}

interface IFetchAppointments {
    dataArray: IDataFromService[],
    clinicianNameArray: string[]
}

interface IGroupAppointment {
    newArray: IDataFromService[],
    nameByGroup: string
}


export const appointmentsSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        updateAppointment(state: IAppointmentState, action: PayloadAction<IDataFromService[]>) {
            state.dataArray = action.payload
            state.notGroupDataArray = action.payload
        },
        addNewAppointment(state: IAppointmentState, action: PayloadAction<IDataFromService>) {
            state.dataArray.push(action.payload)
            state.notGroupDataArray.push(action.payload)
        },
        groupAppointment(state: IAppointmentState, {payload}: PayloadAction<IGroupAppointment>) {
            state.dataArray = payload.newArray
            state.groupBy = payload.nameByGroup
        },
        sortData(state: IAppointmentState, action: PayloadAction<IDataFromService[]>) {
            state.dataArray = action.payload
            state.isSortAscending = !state.isSortAscending
        }
    },
    extraReducers: {
        [fetchAppointments.fulfilled.type]: (state: IAppointmentState, action: PayloadAction<IFetchAppointments>) => {   //success
            state.dataArray = action.payload.dataArray;
            state.notGroupDataArray = action.payload.dataArray;
            state.isLoading = false;
            state.clinicianNameArray = action.payload.clinicianNameArray;

        },
        [fetchAppointments.pending.type]: (state: IAppointmentState) => {                               //waiting
            state.isLoading = true;
        },
        [fetchAppointments.rejected.type]: (state: IAppointmentState, action: PayloadAction<string>) => {   //error
            state.error = action.payload;
            state.isLoading = false;
        },
    }
})

export default appointmentsSlice.reducer

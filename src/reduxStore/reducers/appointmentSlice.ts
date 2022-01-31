import {IAppointments} from "../../models/IAppointments";
import {noGroup} from "../../utils/appointmentsConstants";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAppointments} from "../actions/aciontsAppointments";


interface AppointmentStateType {
    dataArray: IAppointments[];
    notGroupDataArray: IAppointments[];
    isSortAscending: boolean;
    isLoading: boolean;
    error: null | string;
    clinicianNameArray: string[];
    groupBy: string;
}

const initialState: AppointmentStateType = {
    dataArray: [],
    notGroupDataArray: [],
    isSortAscending: false,
    isLoading: false,
    error: null,
    clinicianNameArray: [],
    groupBy: noGroup
}

interface IFetchAppointments {
    dataArray: IAppointments[],
    clinicianNameArray: string[]
}

interface IGroupAppointment {
    newArray: IAppointments[],
    nameByGroup: string
}


export const appointmentsSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {
        updateAppointment(state, action: PayloadAction<IAppointments[]>) {
            state.dataArray = action.payload
            state.notGroupDataArray = action.payload
        },
        addNewAppointment(state, action: PayloadAction<IAppointments>) {
            state.dataArray.push(action.payload)
            state.notGroupDataArray.push(action.payload)
        },
        groupAppointment(state, {payload}: PayloadAction<IGroupAppointment>) {
            state.dataArray = payload.newArray
            state.groupBy =  payload.nameByGroup
        },
        sortData(state) {
            state.isSortAscending = !state.isSortAscending
        }
    },
    extraReducers: {
        [fetchAppointments.fulfilled.type]: (state, action: PayloadAction<IFetchAppointments>) => {   //success
            state.dataArray = action.payload.dataArray;
            state.notGroupDataArray = action.payload.dataArray;
            state.isLoading = false;
            state.clinicianNameArray = action.payload.clinicianNameArray;

        },
        [fetchAppointments.pending.type]: (state) => {                               //waiting
            state.isLoading = true;
        },
        [fetchAppointments.rejected.type]: (state, action: PayloadAction<string>) => {   //error
            state.error = action.payload;
            state.isLoading = false;
        },
    }
})
    // .handleType(Sort_Ascending, (state: typeof initialState) => ({...state, isSortAscending: !state.isSortAscending}))
export default appointmentsSlice.reducer
import {AppDispatch, RootState} from "../reducers/rootReducer";
import {IAppointments, IReturnedDispatch} from "../../models/IAppointments";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {appointmentsSlice} from "../reducers/appointmentSlice";
import {DataFromService} from "../reducers/Appointments";
import {IAppointmentObject} from "./Appointments";
import { v4 as uuidv4 } from 'uuid';
import {monthNames, noGroup} from "../../utils/appointmentsConstants";


const uniqueClinicianName = (arr: IAppointments[]) => {
    const result: string[] = [];
    for (let item of arr) {
        const clinicianName: string = item.clinicianName

        if (!result.includes(clinicianName)) {
            result.push(clinicianName);
        }
    }

    result.unshift(noGroup)
    return result;
}

//  Fetching data



export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await fetch('./data.json')
            const res: IAppointments[] = await response.json()
            return {dataArray: res, clinicianNameArray: uniqueClinicianName(res)};
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

//  DELETE Appointment

export const removeAppointment: IReturnedDispatch = (idObj) =>
    (dispatch, getState)  => {
        const dataArray = Object.assign([], getState().appointmentsReducer.dataArray)
        const newArray: IAppointments[] = []

        dataArray.forEach((i: IAppointments) => {
            if (i.id != idObj) {
                newArray.push(i)
            }
        })

        dispatch(appointmentsSlice.actions.updateAppointment(newArray))
    }

//  add NEW Appointment

export const addAppointment: IReturnedDispatch = (Obj: IAppointmentObject) =>
    (dispatch, getState)  => {
        const groupBy = getState().appointmentsReducer.groupBy

        const newObj: IAppointments = {
            'id': uuidv4(),
            'startDate': Obj.startDate,
            'endDate': new Date(new Date(Obj.startDate).getTime() + +Obj.duration * 60000).toISOString(),
            'clinicianName': Obj.clinicianName,
            'patient': {
                'id': uuidv4(),
                'name': Obj.name
            },
            'status': 'ACTIVE'
        }

        dispatch(appointmentsSlice.actions.addNewAppointment(newObj))
        dispatch(groupByAppointment(groupBy))
    }
//

// Sort Data

export const dataSort: IReturnedDispatch = () =>
    (dispatch, getState)  => {
        const newArray = [...getState().appointmentsReducer.dataArray]
        if (getState().appointmentsReducer.isSortAscending) {
            newArray.sort((a, b) => +new Date(b['startDate']) - +new Date(a['startDate']))
        } else {
            newArray.sort((a, b) => +new Date(a['startDate']) - +new Date(b['startDate']))
        }
        dispatch(appointmentsSlice.actions.updateAppointment(newArray))
        dispatch(appointmentsSlice.actions.sortData())
    }

// GroupBy



export const groupByAppointment: IReturnedDispatch = (nameByGroup: string) =>
    (dispatch, getState)  => {
        const monthNumber: number = monthNames.indexOf(nameByGroup);

        const array: IAppointments[] = Object.assign([], getState().appointmentsReducer.notGroupDataArray)
        let newArray: IAppointments[] = []

        const dispatchGrouping = () => {
            if (nameByGroup === noGroup) {
                newArray = array
                dispatch(appointmentsSlice.actions.groupAppointment({newArray, nameByGroup}))
            } else {
                dispatch(appointmentsSlice.actions.groupAppointment({newArray, nameByGroup}))
            }
        }


        if (monthNumber !== -1) {

            array.forEach((i: DataFromService) => {
                const date = new Date(i.startDate).getMonth()
                if (date == monthNumber) {
                    newArray.push(i)
                }
            })
            dispatchGrouping()
        } else {
            array.forEach((i: DataFromService) => {
                if (i.clinicianName == nameByGroup) {
                    newArray.push(i)
                }
            })
            dispatchGrouping()
        }
    }


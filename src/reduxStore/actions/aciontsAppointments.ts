import {IDataFromService, IAppointmentObject, IReturnedDispatch} from "../../types/Appointments";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {appointmentsSlice} from "../reducers/appointmentSlice";
import {v4 as uuidv4} from 'uuid';
import {monthNames, NO_GROUP} from "../../utils/appointmentsConstants";
import {uniqueClinicianName} from "../../utils/uniqueClinicianName";




//  Fetching data

export const fetchAppointments = createAsyncThunk(
    'appointments/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await fetch('./data.json')
            const res: IDataFromService[] = await response.json()
            return {dataArray: res, clinicianNameArray: uniqueClinicianName(res)};
        } catch (e) {
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

//  DELETE Appointment

export const removeAppointment: IReturnedDispatch = (id: string) =>
    (dispatch, getState) => {
        const dataArray = Object.assign([], getState().appointmentsReducer.dataArray)
        const newArray: IDataFromService[] = []

        dataArray.forEach((i: IDataFromService) => {
            if (i.id !== id) {
                newArray.push(i)
            }
        })
        dispatch(appointmentsSlice.actions.updateAppointment(newArray))
    }

//  add NEW Appointment

export const addAppointment: IReturnedDispatch = (ObjAppointment: IAppointmentObject) =>
    (dispatch, getState) => {
        const groupBy = getState().appointmentsReducer.groupBy

        const newObj: IDataFromService = {
            id: uuidv4(),
            startDate: ObjAppointment.startDate,
            endDate: new Date(new Date(ObjAppointment.startDate).getTime() + +ObjAppointment.duration* 60000).toISOString(),
            clinicianName: ObjAppointment.clinicianName,
            patient: {
                id: uuidv4(),
                name: ObjAppointment.name
            },
            status: 'ACTIVE'
        }

        dispatch(appointmentsSlice.actions.addNewAppointment(newObj))
        dispatch(groupByAppointment(groupBy))
    }


// Sort Data

export const dataSort: IReturnedDispatch = () =>
    (dispatch, getState) => {
        const newArray = [...getState().appointmentsReducer.dataArray]
        if (getState().appointmentsReducer.isSortAscending) {
            newArray.sort((a, b) => +new Date(b['startDate']) - +new Date(a['startDate']))
        } else {
            newArray.sort((a, b) => +new Date(a['startDate']) - +new Date(b['startDate']))
        }
        dispatch(appointmentsSlice.actions.sortData(newArray))
    }

// GroupBy

export const groupByAppointment: IReturnedDispatch = (nameByGroup: string) =>
    (dispatch, getState) => {
        const monthNumber: number = monthNames.indexOf(nameByGroup);

        const array: IDataFromService[] = Object.assign([], getState().appointmentsReducer.notGroupDataArray)
        let newArray: IDataFromService[] = []

        const dispatchGrouping = () => {
            if (nameByGroup === NO_GROUP) {
                newArray = array
                dispatch(appointmentsSlice.actions.groupAppointment({newArray, nameByGroup}))
            } else {
                dispatch(appointmentsSlice.actions.groupAppointment({newArray, nameByGroup}))
            }
        }

        if (monthNumber !== -1) {
            array.forEach((ObjAppointment: IDataFromService) => {
                const date = new Date(ObjAppointment.startDate).getMonth()
                if (date === monthNumber) {
                    newArray.push(ObjAppointment)
                }
            })
            dispatchGrouping()
        } else {
            array.forEach((ObjAppointment: IDataFromService) => {
                if (ObjAppointment.clinicianName === nameByGroup) {
                    newArray.push(ObjAppointment)
                }
            })
            dispatchGrouping()
        }
    }


import {action} from "typesafe-actions";
import {
    Update_Appointment,
    Add_New_Appointment,
    Fetch_Data_Success,
    Fetch_Appointment_Start,
    Fetch_Data_Error,
    Sort_Ascending, Group_Appointment
} from "./actionsTypes";
import {DataFromService} from "../reducers/Appointments";
import {HashFoeIDData} from "../../Hash/HashFoeIDData";

export interface AppointmentObject {
    clinicianName: string
    duration: string | number
    name: string
    startDate: string
}

//  Fetching data

const fetchDataSuccess = (dataArray: Object[], clinicianNameArray: string[]) => action(Fetch_Data_Success, {
    dataArray,
    clinicianNameArray
});

const fetchDataError = (error: string) => action(Fetch_Data_Error, error);

const fetchDataStart = () => action(Fetch_Appointment_Start);

const uniqueClinicianName = (arr: Array<any>) => {
    const result: string[] = [];
    for (let item of arr) {
        item = item.clinicianName
        if (!result.includes(item)) {
            result.push(item);
        }
    }
    result.unshift('No group')
    return result;
}

export const fetchData = () =>

    (dispatch: Function) => {
        dispatch(fetchDataStart())

        function delay(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        fetch('./data.json')
            .then(res => res.json())

            // .then((data) => dispatch(fetchDataSuccess(data, uniqueClinicianName(data))))       // uncomment  this for start without delay
                                                                                                  // and  comment next .then
            .then((data) => {                                                                   // imitation of a response delay from the service
                delay(1500)
                    .then(() => {
                        dispatch(fetchDataSuccess(data, uniqueClinicianName(data)))
                    })
            })

            .catch(error => {
                dispatch(fetchDataError(error.message))
            });
    }


//  DELETE Appointment

const updateStateAppointment = (newArray: Array<Object>) => action(Update_Appointment, newArray);

export const removeAppointment = (idObj: string | number) =>
    (dispatch: Function, getState: Function) => {
        const Array = Object.assign([], getState().appointments.dataArray)
        const newArray: {}[] = []
        Array.forEach((i: DataFromService) => {
            if (i.id != idObj) {
                newArray.push(i)
            }
        })
        dispatch(updateStateAppointment(newArray))
    }


//  add NEW Appointment

export const add = (newItem: Object) => action(Add_New_Appointment, {newItem});

export const addAppointment = (Obj: AppointmentObject) =>
    (dispatch: Function) => {
        const newObj: Omit<DataFromService, "status"> = {
            'id': HashFoeIDData(),
            'startDate': Obj.startDate,
            'endDate': new Date(new Date(Obj.startDate).getTime() + +Obj.duration * 60000),
            'clinicianName': Obj.clinicianName,
            'patient': {
                'id': HashFoeIDData(),
                'name': Obj.name
            }
        }
        dispatch(add(newObj))
    }

// Sort Data

export const sortData = () => action(Sort_Ascending);

export const DataSort = () =>
    (dispatch: Function, getState: Function) => {
        const newArray = getState().appointments.dataArray

        if (getState().appointments.isSortAscending) {
            newArray.sort((a: DataFromService, b: DataFromService) => +new Date(b['startDate']) - +new Date(a['startDate']))
        } else {
            newArray.sort((a: DataFromService, b: DataFromService) => +new Date(a['startDate']) - +new Date(b['startDate']))
        }
        dispatch(updateStateAppointment(newArray))
        dispatch(sortData())

    }

// GroupBy
const GroupAppointment = (newArray: Array<Object>) => action(Group_Appointment, newArray);
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
export const GroupByAppointment = (nameByGroup: string) =>
    (dispatch: Function, getState: Function) => {

        const monthNumber = monthNames.indexOf(nameByGroup);

        const Array = Object.assign([], getState().appointments.notGroupDataArray)
        const newArray: {}[] = []

        if (monthNumber !== -1) {

            Array.forEach((i: DataFromService) => {
                const date = new Date(i.startDate).getMonth()
                if ( date == monthNumber) {
                    newArray.push(i)
                }
            })
            if (nameByGroup === 'No group') {
                dispatch(GroupAppointment(Array))
            } else {
                dispatch(GroupAppointment(newArray))
            }
        } else {

            Array.forEach((i: DataFromService) => {
                if (i.clinicianName == nameByGroup) {
                    newArray.push(i)
                }
            })
            if (nameByGroup === 'No group') {
                dispatch(GroupAppointment(Array))
            } else {
                dispatch(GroupAppointment(newArray))
            }

        }
    }


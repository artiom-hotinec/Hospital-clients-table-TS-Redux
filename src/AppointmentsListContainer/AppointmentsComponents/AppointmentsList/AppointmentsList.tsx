import * as React from 'react'
import {PatientCard, PatientCardProps} from "./PatientCard/PatientCard";
import {v4 as uuidv4} from 'uuid';
import {IReturnedDispatch} from "../../../models/IAppointments";


export type dataList = {
    clinicianName: string,
    duration: string | number,
    patientName: string,
    startDate: string,
    startTime: string,
}


export interface AppointmentsList {
    dataAppointmentsArray: dataList[],
    idArray: string[],
    removeAppointment: IReturnedDispatch
}


export const AppointmentsList: React.FC<AppointmentsList> = ({dataAppointmentsArray, idArray, removeAppointment}) => {

    return (
        <>
            {dataAppointmentsArray.map((appointments: PatientCardProps["objDataOfPatient"], index) => {
                return (
                    <PatientCard objDataOfPatient={appointments} key={uuidv4()} idForLi={idArray[index]}
                                 removeAppointment={removeAppointment}/>
                )
            })}
        </>
    )
}




import * as React from 'react'
import {PatientCard, PatientCardProps} from "./PatientCard/PatientCard";
import {HashForKey} from "../../../Hash/HashForKey";


export type dataList = {
    clinicianName: string,
    duration: string | number,
    patientName: string,
    startDate: string,
    startTime: string,
}



export interface AppointmentsList{
    dataAppointmentsArray: dataList[],
    idArray:string[],
    removeAppointment: ()=> void
}


export const AppointmentsList: React.FC<AppointmentsList> = ({dataAppointmentsArray, idArray, removeAppointment}) =>  {

    return (
        <>
            {dataAppointmentsArray.map((appointments: PatientCardProps["objDataOfPatient"], index) => {
                return (
                    <PatientCard objDataOfPatient={appointments} key={HashForKey(appointments.patientName)} idForli={idArray[index]} removeAppointment={removeAppointment}  />
                )
            })}
        </>
    )
}




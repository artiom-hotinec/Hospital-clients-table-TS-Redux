import * as React from 'react'
import {useAppDispatch, useAppSelector} from "../hook/redux";
import {AppointmentsTitle} from "./AppointmentsComponents/AppointmentsTitle/AppointmentsTitle";
import {AppointmentsList} from "./AppointmentsComponents/AppointmentsList/AppointmentsList";
import {AddNewAppointment} from "./AppointmentsComponents/AddNewAppointment/AddNewAppointment";
import {AppointmentsGroupBy} from "./AppointmentsComponents/AppointmentsGroupBy/AppointmentsGroupBy";
import './Appointments.css'

import {Loader} from "../Componets/UI/Loader/Loader";
import {monthNames, NO_GROUP, titlesList} from "../utils/appointmentsConstants";

import {
    fetchAppointments,
    removeAppointment,
    groupByAppointment,
    addAppointment,
    dataSort
} from "../reduxStore/actions/aciontsAppointments";


export const AppointmentsContainer = () => {

    const {
        dataArray,
        clinicianNameArray,
        isLoading,
        notGroupDataArray,

    } = useAppSelector(state => state.appointmentsReducer)
    const state = useAppSelector(state => state.appointmentsReducer)

    const dispatch = useAppDispatch()

    React.useEffect(() => {
        dispatch(fetchAppointments())
    }, []);

    // @ts-ignore   //todo del ts-ignore
    window.state = state!

    const idArray: string[] = []
    const dataForList = dataArray.map((obj) => {
        const {patient, startDate, endDate, clinicianName, id} = obj
        idArray.push(id)


        const startData: Date = new Date(startDate);
        const endData: Date = new Date(endDate);

        const localData = startData.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        const duration = Math.abs(+startData - +endData) / 60000;

        return {
            patientName: patient.name,
            startDate: localData,
            startTime: startData.toLocaleTimeString(),
            duration,
            clinicianName
        }
    })

    let monthArray: string[] = notGroupDataArray.map((obj) => {
        const {startDate} = obj

        const startData: Date = new Date(startDate);

        return monthNames[startData.getMonth()]
    })

    const listAddNewAppointment = [...clinicianNameArray]
    listAddNewAppointment.shift()

    monthArray = Array.from(new Set(monthArray))
    monthArray.unshift(NO_GROUP)

    return (
        <>
            {
                isLoading
                    ? <Loader/>
                    : <div className={'Appointments'}>
                        <AppointmentsGroupBy monthNames={monthArray} clinicianName={clinicianNameArray}
                                             groupByAppointment={groupByAppointment}/>
                        <AppointmentsTitle titles={titlesList} sortData={dataSort}/>
                        <AppointmentsList dataAppointmentsArray={dataForList} idArray={idArray}
                                          removeAppointment={removeAppointment}/>
                        <AddNewAppointment addAppointment={addAppointment} clinicianNameArray={listAddNewAppointment}/>
                    </div>
            }
        </>
    )
}
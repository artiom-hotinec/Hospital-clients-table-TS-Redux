import * as React from 'react'
import {AppointmentsTitle} from "./AppointmentsComponents/AppointmentsTitle/AppointmentsTitle";
import {AppointmentsList} from "./AppointmentsComponents/AppointmentsList/AppointmentsList";
import {AddNewAppointment} from "./AppointmentsComponents/AddNewAppointment/AddNewAppointment";
import './Appointments.css'
import {connect} from 'react-redux';
import {
    removeAppointment,
    addAppointment,
    fetchData,
    DataSort,
    GroupByAppointment
} from "../reduxStore/actions/Appointments";
import {AppointmentsGroupBy} from "./AppointmentsComponents/AppointmentsGroupBy/AppointmentsGroupBy";
import {Loader} from "../Componets/UI/Loader/Loader";

export interface AppointmentsContainerProps {
    [key: string]: any
}

const AppointmentsContainer: React.FunctionComponent<AppointmentsContainerProps> = ({
                                                                                        dataArray,
                                                                                        removeAppointment,
                                                                                        addAppointment,
                                                                                        fetchData,
                                                                                        clinicianNameArray,
                                                                                        isLoading,
                                                                                        DataSort,
                                                                                        GroupByAppointment,
                                                                                        notGroupDataArray,

                                                                                    }) => {
    React.useEffect(() => {
        fetchData()
    }, []);

    let monthArray: string[]  = []
    const idArray: string[] = []
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const dataForList = dataArray.map((obj: AppointmentsContainerProps) => {
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

    monthArray = notGroupDataArray.map((obj: AppointmentsContainerProps) => {
        const {startDate} = obj

        const startData: Date = new Date(startDate);

       return monthNames[startData.getMonth()]
    })


    const list = ['Patient name', 'Start Date', 'Start Time', 'Duration', 'Clinician name']
    const listForGroupBy = clinicianNameArray

    monthArray = Array.from(new Set(monthArray))
    monthArray.unshift('No group')
    monthNames.unshift('No group')




    return (
        <>
            {
                isLoading
                    ? <Loader />
                    : <div className={'Appointments'}>
                        <AppointmentsGroupBy monthNames={monthArray} clinicianName={listForGroupBy} GroupByAppointment={GroupByAppointment}/>
                        <AppointmentsTitle titles={list} sortData={DataSort}/>
                        <AppointmentsList dataAppointmentsArray={dataForList} idArray={idArray}
                                          removeAppointment={removeAppointment}/>
                        <AddNewAppointment addAppointment={addAppointment} clinicianNameArray={clinicianNameArray}/>

                    </div>
            }
        </>

    )
}


function mapStateToProps(state: AppointmentsContainerProps) {
    return {
        dataArray: state.appointments.dataArray,
        notGroupDataArray: state.appointments.notGroupDataArray,
        clinicianNameArray: state.appointments.clinicianNameArray,
        isLoading: state.appointments.isLoading,
        state: state
    }
}

function mapDispatchToProps(dispatch: Function) {
    return {
        removeAppointment: (id: string) => dispatch(removeAppointment(id)),
        addAppointment: (obj: any) => dispatch(addAppointment(obj)),
        fetchData: () => dispatch(fetchData()),
        DataSort: () => dispatch(DataSort()),
        GroupByAppointment:(nameByGroup: string) => dispatch(GroupByAppointment(nameByGroup)),



    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsContainer)


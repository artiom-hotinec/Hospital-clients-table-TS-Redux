import * as React from "react";
import {AppointmentsTitle} from "../AppointmentsComponents/AppointmentsTitle/AppointmentsTitle";
import {AddNewAppointment} from "../AppointmentsComponents/AddNewAppointment/AddNewAppointment";

export interface AppointmentsProps {
    titles: string[],
    sortData: (e: React.MouseEvent) => void
}

export const AppointmentsListddddddddddddddd: React.FunctionComponent<AppointmentsProps> = ({titles, sortData}) => {
    return (
        <ul>
            {/*<li className={'cardStyle grid'}>*/}
            {/*    <strong>Patient name</strong>*/}
            {/*    <strong id='startDate' className={'dataSort'} onClick={sortData}>Start Date</strong>*/}
            {/*    <strong>Start Time</strong>*/}
            {/*    <strong>Duration</strong>*/}
            {/*    <strong id='clinicianName' className={'dataSort'} onClick={sortData}>Clinician name</strong>*/}
            {/*</li>*/}

            <AppointmentsTitle titles={titles} sortData={sortData} />

            {/*<AddNewAppointment/>*/}


            {/*<li className={'form grid'}>*/}
            {/*    <AddNewAppointment className={'grid'}/>*/}
            {/*</li>*/}

        </ul>
    )
}

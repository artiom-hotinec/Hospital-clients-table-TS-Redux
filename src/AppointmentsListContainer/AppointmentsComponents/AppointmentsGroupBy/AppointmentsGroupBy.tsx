import React, {useCallback, useState} from "react";
import {Select} from "../../../Componets/UI/Select/Select";
import "./AppointmentsGroupBy.css";
import {useAppDispatch} from "../../../hook/redux";
import {IReturnedDispatch} from "../../../models/IAppointments";

export interface AppointmentsGroupByProps {
    monthNames: string[],
    clinicianName: string[],
    groupByAppointment: IReturnedDispatch
}

export const AppointmentsGroupBy: React.FunctionComponent<AppointmentsGroupByProps> = ({
                                                                                           monthNames,
                                                                                           clinicianName,
                                                                                           groupByAppointment
                                                                                       }) => {

    const [localMonthNames, setLocalMonthNames] = useState('')
    const [localClinicianName, setLocalClinicianName] = useState('')

    const dispatch = useAppDispatch()

    const changeHandleMonthNames = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const eName = e.target.value
            setLocalMonthNames(eName)
            dispatch(groupByAppointment(eName))
            setLocalClinicianName('')
        },
        [setLocalClinicianName]
    );
    const changeHandleClinicianName = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const eName = e.target.value
            setLocalClinicianName(eName)
            dispatch(groupByAppointment(eName))
            setLocalMonthNames('')
        },
        [setLocalClinicianName]
    );
    return (
        <div>
            <Select id={'monthNames'} value={localMonthNames} onChangeHandler={changeHandleMonthNames}
                    options={monthNames} labelText={'Groped by month:'} className={'GropedBy'}/>
            <Select id={'clinicianName'} value={localClinicianName} onChangeHandler={changeHandleClinicianName}
                    options={clinicianName} labelText={'Groped by clinician name:'} className={'GropedBy'}/>
        </div>
    )
}

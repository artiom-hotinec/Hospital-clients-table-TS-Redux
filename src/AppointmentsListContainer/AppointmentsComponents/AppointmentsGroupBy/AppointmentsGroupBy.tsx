import React, {useCallback, useState} from "react";
import {SelectCustom} from "../../../Componets/UI/SelectCustom/SelectCustom";
import  "./AppointmentsGroupBy.css";

export interface AppointmentsGroupByProps {
    monthNames: string[],
    clinicianName: string[],
    GroupByAppointment: Function,
}

export const AppointmentsGroupBy: React.FunctionComponent<AppointmentsGroupByProps> = ({monthNames, clinicianName, GroupByAppointment}) => {

    const [localMonthNames, setLocalMonthNames] = useState('')
    const [localClinicianName, setLocalClinicianName] = useState('')

    const changeHandleMonthNames = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const eName=e.target.value
            setLocalMonthNames(eName)
            GroupByAppointment(eName)
            setLocalClinicianName('')
        },
        [setLocalClinicianName]
    );
    const changeHandleClinicianName = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) =>{
            const eName=e.target.value
            setLocalClinicianName(eName)
            GroupByAppointment(eName)
            setLocalMonthNames('')
        },
        [setLocalClinicianName]
    );
    return (
        <div>
            <SelectCustom id={'monthNames'} value={localMonthNames} onChangeHandler={changeHandleMonthNames}
                          options={monthNames} labelText={'Groped by month:'} htmlFor={'monthNames'} className={'GropedBy'}/>
            <SelectCustom id={'clinicianName'} value={localClinicianName} onChangeHandler={changeHandleClinicianName}
                          options={clinicianName} labelText={'Groped by clinician name:'} htmlFor={'ClinicianName'} className={'GropedBy'}/>
        </div>
    )
}

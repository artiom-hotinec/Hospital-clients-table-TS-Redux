import * as React from "react";
import {useCallback} from "react";
import './PatientCard.css'
import {v4 as uuidv4} from 'uuid';
import {Button} from "../../../../Componets/UI/Button/Button";
import {dataList} from "../AppointmentsList";
import {useAppDispatch} from "../../../../hook/redux";
import {IReturnedDispatch} from "../../../../types/Appointments";
import {ButtonView} from "../../../../Componets/UI/Button/buttonType";


export interface PatientCardProps {
    objDataOfPatient: dataList,
    idForLi: string,
    removeAppointment: IReturnedDispatch
}


export const PatientCard: React.FC<PatientCardProps> = ({objDataOfPatient, idForLi, removeAppointment}) => {

    const cls: string[] = [];

    if (objDataOfPatient.duration > 60) {
        cls.push("moreThenHour")
    }
    const dispatch = useAppDispatch()

    const BtnHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.target as Element

            dispatch(removeAppointment(target.parentElement.id))
        },
        [removeAppointment]
    );


    return (
        <li className={'grid'} id={idForLi}>
            {Object.entries(objDataOfPatient).map(([key, value]) => {
                return (
                    <span className={cls.join(' ')} key={uuidv4()}>
                        {value} {key === 'duration' ? 'min' : null}
                    </span>
                )
            })}
            <Button title={'Delete appointments'} onClick={BtnHandler} view={ButtonView.triggerOverlay}/>

        </li>
    )
}


import * as React from "react";
import './PatientCard.css'
import {HashForKey} from "../../../../Hash/HashForKey";
import {ButtonCustom} from "../../../../Componets/UI/ButtonCustom/ButtonCustom";
import {useCallback} from "react";
import {dataList} from "../AppointmentsList";


export interface PatientCardProps {
    objDataOfPatient: dataList,
    idForli: string,
    removeAppointment: (arg: string | number)=> void
}


export const PatientCard: React.FC<PatientCardProps> = ({objDataOfPatient, idForli, removeAppointment}) => {

    const cls: string[]= [];

    if (objDataOfPatient.duration>60){
        cls.push("moreThenHour")
    }

    const BtnHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            const target = e.target as Element
            removeAppointment(target.parentElement.id)
        },
        [removeAppointment]
    );


    return (
        <li className={'grid'} id={idForli}>
            {Object.entries(objDataOfPatient).map(([key,value ])=>{
                return (
                    <span className={cls.join(' ')} key={HashForKey(key)}>
                        {value} {key === 'duration' ? 'min' : null}
                    </span>
                )
            })}
            <ButtonCustom btnName={'Delete appointments'} onClick={BtnHandler} className={'btn-TriggerOverlay'}/>
           {/*<span className={cls}>*/}
           {/*    {props.patientName}*/}
           {/*</span>*/}
           {/* <span className={cls}>*/}
           {/*    {props.startDate}*/}
           {/*</span>*/}
           {/* <span className={cls}>*/}
           {/*    {props.startTime}*/}
           {/*</span>*/}
           {/* <span className={cls}>*/}
           {/*    {props.duration} min*/}
           {/*</span>*/}
           {/* <span className={cls}>*/}
           {/*    {props.clinicianName}*/}
           {/*</span>*/}
        </li>
    )
}


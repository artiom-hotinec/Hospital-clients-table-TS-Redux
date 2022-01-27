import React, {useCallback, useState} from "react";
import "./AddNewAppointment.css";
import {InputCustom} from "../../../Componets/UI/InputCustom/InputCustom";
import {ButtonCustom} from "../../../Componets/UI/ButtonCustom/ButtonCustom";
import {SelectCustom} from "../../../Componets/UI/SelectCustom/SelectCustom";


export interface AddNewAppointmentProps {
    addAppointment: ({}) => void,
    clinicianNameArray: string[]
}


export const AddNewAppointment: React.FunctionComponent<AddNewAppointmentProps> = ({
                                                                                       addAppointment,
                                                                                       clinicianNameArray
                                                                                   }) => {


    const [localName, setLocalName] = useState('')
    const [localStartData, setLocalStartData] = useState('')
    const [localDuration, setLocalDuration] = useState('30')
    const [localClinicianName, setLocalClinicianName] = useState('John Adams')


    const addAppointmentHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {

            if (localName && localStartData && localDuration) {

                addAppointment({
                    name: localName,
                    startDate: localStartData,
                    duration: localDuration,
                    clinicianName: localClinicianName
                })


                setLocalName('')
                setLocalStartData('')
                setLocalDuration('30')
                setLocalClinicianName('John Adams')
                e.preventDefault()
            }
        },
        [localName, localStartData, localDuration, addAppointment, setLocalName, setLocalStartData, setLocalDuration, setLocalClinicianName]
    );


    const changeHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setLocalName(e.target.value),
        [setLocalName]
    );

    const changeHandleData = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setLocalStartData(e.target.value),
        [setLocalStartData]
    );

    const changeDurationHandler = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => setLocalDuration(e.target.value),
        [setLocalDuration]
    );

    const onChangeOptionHandler = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => setLocalClinicianName(e.target.value),
        [setLocalClinicianName]
    );

    return (
        <div>
            <form className={'AddNewAppointment'}>

                <InputCustom id={'name'} type={'text'} value={localName} labelTitle={'Name'}
                             onChangeHandler={changeHandler}/>
                <InputCustom id={'startData'} type={'datetime-local'} value={localStartData} labelTitle={'Start data'}
                             onChangeHandler={changeHandleData}/>
                <InputCustom id={'duration'} type={'number'} value={localDuration} labelTitle={'Duration'}
                             onChangeHandler={changeDurationHandler} spanName={'min'}
                             minValue={30} step={5}/>
                <SelectCustom id={'clinicianName'} value={localClinicianName} onChangeHandler={onChangeOptionHandler}
                              options={clinicianNameArray} labelText={'Clinician name'} htmlFor={'Clinician name'}/>
                <ButtonCustom type="submit" onClick={addAppointmentHandler} btnName={'Add new appointment'}
                              className={'btn-BoxShadow'}/>
            </form>
        </div>

    )
}

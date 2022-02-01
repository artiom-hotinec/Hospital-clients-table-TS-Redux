import React, {useCallback, useState} from "react";
import "./AddNewAppointment.css";
import {Input} from "../../../Componets/UI/Input/Input";
import {Button} from "../../../Componets/UI/Button/Button";
import {Select} from "../../../Componets/UI/Select/Select";
import {useAppDispatch} from "../../../hook/redux";
import {IReturnedDispatch} from "../../../types/Appointments";
import {ButtonType, ButtonView} from "../../../Componets/UI/Button/buttonType";


export interface AddNewAppointmentProps {
    addAppointment: IReturnedDispatch
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


    const dispatch = useAppDispatch()

    const addAppointmentHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {

            if (localName && localStartData && localDuration) {

                const newObj = {
                    name: localName,
                    startDate: localStartData,
                    duration: localDuration,
                    clinicianName: localClinicianName
                }
                dispatch(addAppointment(newObj))


                setLocalName('')
                setLocalStartData('')
                setLocalDuration('30')
                setLocalClinicianName('John Adams')
                e.preventDefault()
            }
        },
        [localName, localStartData, localDuration, localClinicianName]
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

                <Input id={'name'} type={'text'} value={localName} labelTitle={'Name'}
                       onChangeHandler={changeHandler}/>
                <Input id={'startData'} type={'datetime-local'} value={localStartData} labelTitle={'Start data'}
                       onChangeHandler={changeHandleData}/>
                <Input id={'duration'} type={'number'} value={localDuration} labelTitle={'Duration'}
                       onChangeHandler={changeDurationHandler} spanName={'min'}
                       minValue={30} step={5}/>
                <Select id={'clinicianName'} value={localClinicianName} onChangeHandler={onChangeOptionHandler}
                        options={clinicianNameArray} labelText={'Clinician name'}/>
                <Button type={ButtonType.Submit} onClick={addAppointmentHandler} title={'Add new appointment'}
                        view={ButtonView.shadow}/>
            </form>
        </div>

    )
}

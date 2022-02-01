import {v4 as uuidv4} from 'uuid';
import React, {useCallback} from "react";
import {useAppDispatch} from "../../../hook/redux";
import {START_DATE} from "../../../utils/appointmentsConstants";
import {IReturnedDispatch} from "../../../types/Appointments";

export interface AppointmentsTitleProps {
    titles: string[],
    sortData: IReturnedDispatch
}

export const AppointmentsTitle: React.FC<AppointmentsTitleProps> = ({titles, sortData}) => {

    const dispatch = useAppDispatch()

    const addAppointmentHandler = useCallback(
        () => dispatch(sortData()),
        [sortData]
    );


    return (
        <li className={'title grid'}>
            {titles.map((title) => {

                return (
                    <strong key={uuidv4()}
                            className={title === START_DATE ? 'dataSort' : null}
                            onClick={title === START_DATE ? addAppointmentHandler : null}>
                        {title}
                    </strong>
                )
            })}
        </li>
    )
}

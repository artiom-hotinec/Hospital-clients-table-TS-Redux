import { v4 as uuidv4 } from 'uuid';
import React, {useCallback} from "react";
import {useAppDispatch} from "../../../hook/redux";
import { startDate } from "../../../utils/appointmentsConstants";
import {IReturnedDispatch} from "../../../models/IAppointments";

export interface AppointmentsTitleProps {
    titles: string[],
    sortData: IReturnedDispatch
}

export const AppointmentsTitle: React.FunctionComponent<AppointmentsTitleProps> = ({titles, sortData}) => {

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
                            className={title === startDate ? 'dataSort' : null}
                            onClick={title === startDate ? addAppointmentHandler : null}>
                        {title}
                    </strong>
                )
            })}
        </li>
    )
}

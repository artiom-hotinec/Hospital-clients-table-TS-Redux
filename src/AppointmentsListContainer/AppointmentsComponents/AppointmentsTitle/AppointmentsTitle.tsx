import {HashForKey} from "../../../Hash/HashForKey";
import React, {useCallback} from "react";

export interface AppointmentsTitleProps {
    titles: string[],
    sortData: Function
}

export const AppointmentsTitle: React.FunctionComponent<AppointmentsTitleProps> = ({titles, sortData}) => {

    const addAppointmentHandler = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => sortData(),
        [sortData]
    );

    return (
        <li className={'title grid'}>
            {titles.map((title) => {

                return (
                    <strong key={HashForKey(title)}
                            className={title === 'Start Date' ? 'dataSort' : null}
                            onClick={title === 'Start Date' ? addAppointmentHandler : null}>
                        {title}
                    </strong>
                )
            })}
        </li>
    )
}

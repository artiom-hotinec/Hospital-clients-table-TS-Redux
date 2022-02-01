import * as React from "react";
import {v4 as uuidv4} from 'uuid';


export interface SelectProps {
    id: string,
    value: string,
    labelText: string,
    onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    options: string[],
    className?: string
}

export const Select: React.FunctionComponent<SelectProps> = ({
    id,
    value,
    onChangeHandler,
    options,
    labelText,
    className
}) => {

    return (
        <div className={className}>
            <label htmlFor={id}>{labelText}</label>
            <select id={id} value={value} onChange={onChangeHandler}>
                {options.map((optName) =>
                    <option key={uuidv4()}>
                        {optName}
                    </option>)
                }
            </select>
        </div>
    )
}



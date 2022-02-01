import * as React from "react";
import "./Input.css";

export interface InputProps {
    id: string,
    type: string,
    value: string,
    labelTitle: string,
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
    spanName?: string,
    minValue?: number,
    step?: number
}

export const Input: React.FunctionComponent<InputProps> = ({
    id,
    type,
    value,
    labelTitle,
    onChangeHandler,
    spanName,
    minValue,
    step
}) => {

    return (
        <div>
            <label htmlFor={id}>{labelTitle}</label>
            <input required id={id}
                   type={type} value={value}
                   onChange={onChangeHandler}
                   min={minValue}
                   step={step}/>
            {spanName
                ? <span>{spanName}</span>
                : null
            }
        </div>

    )
}

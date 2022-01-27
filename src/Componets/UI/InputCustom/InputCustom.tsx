import * as React from "react";
import  "./InputCustom.css";

export interface InputCustomProps {
    id: string,
    type: string,
    value: string,
    labelTitle: string,
    onChangeHandler: (e:  React.ChangeEvent<HTMLInputElement>) => void,
    spanName?: string,
    minValue?: number,
    step?: number
}

export const InputCustom: React.FunctionComponent<InputCustomProps> = ({id, type, value, labelTitle, onChangeHandler, spanName, minValue, step })=>{

    return (
        <div>
            <label htmlFor={id}>{labelTitle}</label>
            <input required id={id} type={type} value={value} onChange={onChangeHandler} min={minValue} step={step}/>
            {spanName
                ? <span>{spanName}</span>
                :null
            }
        </div>

    )
}

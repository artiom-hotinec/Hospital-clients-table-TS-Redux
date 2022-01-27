import * as React from "react";
import { HashForKey } from "../../../Hash/HashForKey";
// import  "./SelectCustomProps.css";

export interface SelectCustomProps {
    id: string,
    value: string,
    htmlFor: string,
    labelText: string,
    onChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    options: string[],
    className?:string
}

export const SelectCustom: React.FunctionComponent<SelectCustomProps> = ({id, value, onChangeHandler, options, htmlFor, labelText, className})=>{

    return (
        <div className={className}>
            <label htmlFor={htmlFor}>{labelText}</label>
            <select id={id} value={value} onChange={onChangeHandler}>
                {options.map((optName)=><option key={HashForKey()} >{optName}</option>)}
            </select>
        </div>

    )
}



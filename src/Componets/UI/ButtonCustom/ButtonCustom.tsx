import * as React from "react";
import  "./ButtonCustom.css";

export interface ButtonCustomProps {
    id?: string,
    type?: 'button' | 'submit' | 'reset',
    value?: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    btnName: string,
    className?: 'btn-BoxShadow' | 'btn-TriggerOverlay' | any
}

export const ButtonCustom: React.FunctionComponent<ButtonCustomProps> = ({id, type, value, onClick, btnName, className})=>{

    return (
        <button id={id} type={type} value={value} onClick={onClick} className={className}>{btnName}</button>
    )
}

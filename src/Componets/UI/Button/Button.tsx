import * as React from "react";
import "./Button.css";
import {enumButton} from "./enumButton";

export interface ButtonProps {
    id?: string,
    type?: enumButton,
    value?: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    btnName: string,
    customClass?: 'btn-BoxShadow' | 'btn-TriggerOverlay',
    className?: string
}


export const Button: React.FunctionComponent<ButtonProps> = ({
                                                                 id,
                                                                 type,
                                                                 value,
                                                                 onClick,
                                                                 btnName,
                                                                 customClass = '',
                                                                 className = ''
                                                             }) => {
    const cls = customClass + ' ' + className

    return (
        <button id={id}
                type={type}
                value={value}
                onClick={onClick}
                className={cls}
        >{btnName}</button>
    )
}

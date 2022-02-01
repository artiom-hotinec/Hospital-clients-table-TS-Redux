import * as React from "react";
import "./Button.css";
import {ButtonProps} from "./buttonType";
import clsx from 'clsx';


export const Button: React.FunctionComponent<ButtonProps> = ({
    id,
    type,
    value,
    onClick,
    title,
    className = '',
    view
}) => {

    const cls = view || className ? clsx([view, className]) : null

    return (
        <button id={id}
                type={type}
                value={value}
                onClick={onClick}
                className={cls}
        >{title}</button>
    )
}

import * as React from "react";

export enum ButtonType {
    Button = "button",
    Submit = "submit",
    Reset = "reset",
}

export enum ButtonView {
    shadow = "btn-BoxShadow",
    triggerOverlay = "btn-TriggerOverlay"
}


export interface ButtonProps {
    id?: string,
    type?: ButtonType,
    value?: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    title: string,
    className?: string,
    view?: ButtonView
}
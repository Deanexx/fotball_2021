import style from "./index.module.scss";
import { FC } from "react";
import { createPortal } from "react-dom";
import { Transition } from "react-transition-group";

const modalRoot = document.querySelector("#modal-placeholder") as HTMLElement;

const ModalWrapper: FC<{ on: Function, top: boolean, active: boolean }> = ({ children, on, top, active }) => {
    function ft_fireClass_bottom(state: string) {
        return state === "entering" ? style.animate_bottom_UP : state === "exiting" ? style.animate_bottom_DOWN : " "
    }

    function ft_fireClass_top(state: string) {
        return state === "entering" ? style.animate_top_UP : state === "exiting" ? style.animate_top_DOWN : " "
    }

    return createPortal(
        <Transition
            mountOnEnter
            unmountOnExit
            in={ active }
            timeout={200}>
            { (state) => (
                <div className = { (top ? style.modal__top : style.modal__bottom) + " " + (top ? ft_fireClass_top(state) : ft_fireClass_bottom(state)) }>
                    <div className={ style.cls__btn } onClick={ () => on() }>X</div>
                    { children }
                </div>
                        )}
        </Transition>, modalRoot)
}

export default ModalWrapper;
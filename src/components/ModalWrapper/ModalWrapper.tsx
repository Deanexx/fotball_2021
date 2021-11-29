import style from "./index.module.scss";
import { FC } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-placeholder") as HTMLElement;

const ModalWrapper: FC<{ on: Function }> = ({ children, on }) => {

    return createPortal(<div className = {style.modal}>
            <div className={ style.cls__btn } onClick={ () => on() }>X</div>
            { children }
        </div>, modalRoot)
}

export default ModalWrapper;
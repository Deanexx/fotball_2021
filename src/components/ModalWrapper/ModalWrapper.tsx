import style from "./index.module.scss";
import { FC } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-placeholder") as HTMLElement;

const ModalWrapper: FC<{}> = ({ children }) => {

    return createPortal(<div className = {style.modal}>
            { children }
        </div>, modalRoot)
}

export default ModalWrapper;
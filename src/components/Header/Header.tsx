import style from "./index.module.scss";
import { FC, useState } from "react";
import ModalWrapper from "./../ModalWrapper/ModalWrapper"
import SignIn from "../SignIn/SignIn";

const Header: FC = () => {
    const [btn, setBtn] = useState(false);

    const btn_click = () => {
        setBtn(!btn);
    }
    return(
        <div className={ style.header }>
            <p className={ style.header__logo }>Soccer</p>
            <button className={ style.header__button } onClick={() => btn_click()}> Reg </button>
            { btn && <ModalWrapper on={ btn_click }>
                        <SignIn/>
                    </ModalWrapper> }
        </div>
    )
}

export default Header;
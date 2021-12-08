import style from "./index.module.scss";
import { FC, useState } from "react";
import ModalWrapper from "./../ModalWrapper/ModalWrapper"
import SignIn from "../SignIn/SignIn";
import img from "./../../assets/soccer_ball2.svg"

import { useAppDispatch, useAppSelector } from "../../hooks";

import { signOut } from "../../store/userSlice/Thunks/userThunkSignOut";

const Header: FC = () => {
    const dispatch = useAppDispatch();

    const isUser = useAppSelector( state => Boolean(state.user._id.length) )
    const user = useAppSelector( state => state.user )
    const [btn, setBtn] = useState(false);
    let [btnClicked, setBtnClicked] = useState(false);

    const btn_click = () => {
        setBtn(!btn);
    }

    const animate_btn = () => {
        setBtnClicked(true);
        setTimeout(() =>{ setBtnClicked(false)}, 200)
    }
    return(
        <div className={ style.header }>
            
            <div className={ style.header__logo}>
                <p className={ style.header__logo__inner }>Soccer</p>
                <img src={img} className={ style.header__logo__ball} alt=""/>
            </div>

            { isUser ?
                 <button 
                    className={ style.header__button__signOut }
                    onClick = { () => dispatch(signOut()) }> { user.name } </button> :
                 <button 
                    className={ style.header__button + " " + ( btnClicked ? style.button__clicked : "" )}
                    onClick={() => {
                            btn_click(); 
                            animate_btn();
                        }
                    }> Reg </button>  }

                        <ModalWrapper active={ btn } top={ true } on={ btn_click }>
                            <SignIn activeModal = { btn_click }/>
                        </ModalWrapper>


        </div>
    )
}

export default Header;
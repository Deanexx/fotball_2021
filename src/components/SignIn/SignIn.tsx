import style from "./index.module.scss";
import React, { FC, useState } from "react";
import { setUser } from "../../store/userSlice/Thunks/userThunksReg"
import { useAppDispatch, useAppSelector } from "../../hooks";

import Switch from "./Switch/Switch";

const SignIn: FC<{ activeModal: Function }> = ({ activeModal }) => {
    const loading = useAppSelector(state => state.user.loading);
    const [endPoint, setEndPoint] = useState<"login" | "register">("login");
    const [name, setName] = useState("");
    const dispatch = useAppDispatch();

    let [btnClicked, setBtnClicked] = useState(false);

    const animate_btn = () => {
        setBtnClicked(true);
        setTimeout(() =>{ setBtnClicked(false)}, 200)
    }

    const submitForm = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        await dispatch(setUser({ endPoint, name: name }))
        activeModal();
    }

    const switchToggle = () => {
        setEndPoint( prevState => prevState === "login" ? "register" : "login");
    }

    const computedEndPoint = () => {
        return endPoint === "login"
    }

    return(
        <div className={ style.reg}>
            
            <div className={ style.reg__header}>
                <Switch type={ computedEndPoint() } handleSwitchToggle = { switchToggle } />
                <p className={style.reg__header__title}>{ computedEndPoint() ? "Login" : "Register" }</p>
            </div>

            <form className={ style.form } onSubmit={ (e) => submitForm(e) } >

                <input type="text"
                    className={style.reg__inpute} 
                    value={name}
                    onChange={ (e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)} 
                    placeholder="Name as on Telegram"/>

                <button 
                    className={ style.btn + " " + (btnClicked ? style.button__clicked : "") } 
                    onClick={ () => animate_btn()} 
                    type="submit"> 
                        { loading ? ">>>" : "Submit"} </button>

            </form>
        </div>
    )
}

export default SignIn;
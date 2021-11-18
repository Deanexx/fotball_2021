import { FC } from "react";
import style from "./index.module.scss";

const Switch: FC<{type: boolean, handleSwitchToggle: Function }> = ({ type, handleSwitchToggle }) => {

    // console.log(style, "Component switch rerendered!!!");
    const activeNobe = " " + (type ? "" : style.active__nob);
    const activeBackground = " " + (type ? "" : style.active__background);

    return (<div onClick={ () => handleSwitchToggle() } className={style.switch}>
        <div className={ style.switch__active__background + activeBackground }></div>
        <div className={ style.switch__nob + activeNobe }/>
    </div>)
}

export default Switch;
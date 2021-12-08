import React, { FC } from "react";
import img from "./../../assets/soccer_ball2.svg"
import style from "./index.module.scss";

const SpotOnMap: FC<{lng: number, lat: number}> = ({ lng, lat}) => {
    return (
        <a href={`http://maps.google.com?q=${lat},${lng}`} rel="noreferrer" target="_blank">
                <img className={ style.ball} src={img} alt="Here"/>
        </a>

    )
}

export default SpotOnMap;
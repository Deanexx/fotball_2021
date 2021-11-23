import { FC } from "react";
import style from "./index.module.scss";
import { useAppSelector } from "../../hooks";

const VoteList: FC = () => {
    const currVote = useAppSelector(state => state.vote)
    const listJSX = currVote.users.map(el => <li key={el._id}>{el.name}</li>)

    return (

    <div className={style.soccer__field}>
        <div className={style.soccer__top__goals}>Voted</div>
        <div className={style.soccer__content}>
            <ul>
                { listJSX }
            </ul>
        </div>
        <div className={style.soccer__midLine}></div>
        <div className={style.soccer__bottom__goals}>
            { currVote ?
            currVote["totalUsers"] + " : " + currVote["maxPlayers"] : "Loading..." }
        </div>
    </div>
    )
}

export default VoteList;

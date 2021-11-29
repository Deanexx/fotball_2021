import { FC, useState } from "react";
import style from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";

import Ball from "../Ball/Ball";

import addUser from "../../store/voteSlice/Thunks/addUserThunk";

const VoteList: FC = () => {
    const dispatch = useAppDispatch();

    const currVote = useAppSelector(state => state.vote)
    const isVoted = useAppSelector(state => state.vote.users.find( el => el._id === state.user._id ))
    const user = useAppSelector(state => state.user)

    const [topGoals, setTopGoals] = useState<HTMLDivElement | null>(null);
    const [bottomGoals, setBottomGoals] = useState<HTMLDivElement | null>(null);

    const listJSX = currVote.users.map((el) => <li key={el._id}>{el.name}</li>)

    return (
    <div className={style.soccer__field}>

        <div ref={el => setTopGoals(el)} 
            className={ style.soccer__top__goals }>
               <p>Voted</p>
        </div>

        <div className={style.soccer__content}>
            <div className={style.first__list}>
                <ul>
                    { listJSX.slice(0,5) }
                </ul>
                <ul>
                    { listJSX.slice(5,10) }
                </ul>
            </div>
            <div className={style.second__list}>
                <ul> 
                    { listJSX.slice(10, 16) }
                </ul>
                <ul>
                    { listJSX.slice(16, 22) }
                </ul>
            </div>

        </div>
        <div className={style.soccer__midLine}>
            <div className={style.soccer__midLine__circle + " " + (!isVoted ? "" : style.soccer__midLine__circle__active) }>
                {   !isVoted ? <Ball 
                        topGoals={ topGoals } 
                        bottomGoals={ bottomGoals }
                        isGoal = { () => dispatch(addUser(user)) }/> 
                            : <p className={ style.reset__button }>
                                    Reset
                                </p>    }
            </div>
        </div>
        <div ref={el => setBottomGoals(el) } className={style.soccer__bottom__goals}>
            <p>            
                { currVote ?
                currVote["totalUsers"] + " : " + currVote["maxPlayers"] : "Loading..." }
            </p>
        </div>
    </div>
    )
}

export default VoteList;

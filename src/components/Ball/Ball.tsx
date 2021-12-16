import React, { FC, useEffect, useState } from "react";
import style from "./index.module.scss";
import img from "./../../assets/soccer_ball2.svg"
import { useAppSelector, useAppDispatch } from "../../hooks";
import { addError } from "./../../store/errorSlice/errorSlice";

interface props {
    bottomGoals: HTMLDivElement | null,
    topGoals: HTMLDivElement | null,
    isGoal: Function
}

let CoordGoals = (elem: HTMLDivElement | null) => {
    let box = elem?.getBoundingClientRect();

    return box ? {
      top: box.top + window.pageYOffset,
      right: box.right + window.pageXOffset,
      bottom: box.bottom + window.pageYOffset,
      left: box.left + window.pageXOffset
    } : null
}

let score__goal = (boundaries: ReturnType<typeof CoordGoals>, {x, y}: {x: number, y:number}): boolean => {
    return boundaries
         && y >= boundaries.top
            && y <= boundaries.bottom
                && x >= boundaries.left
                    && x <= boundaries.right ? true : false;
}

const Ball: FC<props> = ({ topGoals, bottomGoals, isGoal }) => {
    const dispatch = useAppDispatch();
    
    let image: any;
    const userID = useAppSelector( state => state.user._id );

    let innerTouch: { x: number, y: number } = { x: -1, y: -1 };
    const topGoalsCoordinates = CoordGoals(topGoals);
    const bottomGoalsCoordinates = CoordGoals(bottomGoals);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if(flag)
            isGoal();
    }, [flag, isGoal])

    const ft_startTouch = (e: React.TouchEvent<HTMLImageElement>) => {
        e.preventDefault();
        if (userID.length < 0)
            return dispatch(addError({ 
                    active: true,
                    message: "Please register !",
                    status: 400}))
        let elem: any = e.target;
        let touch = e.touches[0];

        if(innerTouch.x === -1 && innerTouch.y === -1)
            innerTouch = { y: touch.pageY, x: touch.pageX };

        
        const touchMoveListener = (event: any) => {
            event.preventDefault();
            let ch_touch = event.changedTouches[0];

            if( score__goal(topGoalsCoordinates, { x: ch_touch.pageX, y: ch_touch.pageY }) 
                || score__goal(bottomGoalsCoordinates, { x: ch_touch.pageX, y: ch_touch.pageY }))
                    {
                        elem.removeEventListener("touchmove", touchMoveListener);
                        if(!flag)
                            setFlag(true)   
                    }
            elem.style.top = ch_touch.pageY - innerTouch.y + 25 + "px";
            elem.style.left = ch_touch.pageX - innerTouch.x + 25 + "px";
        }
        if(userID.length > 0) 
            elem.addEventListener("touchmove", touchMoveListener, { passive: false, cancelable: true } )
    }

    const ft_startDrag = (e: any) => {
        e.preventDefault();
        if(userID.length <= 0) return dispatch(addError({ 
            active: true,
            message: "Please register !",
            status: 400}));
        const elem = e.target;

        if(innerTouch.x === -1 && innerTouch.y === -1)
            innerTouch = { y: e.pageY, x: e.pageX };

        let ft_mouseMove = (event:any) => {
            if( score__goal(topGoalsCoordinates, { x: event.pageX, y: event.pageY }) 
                || score__goal(bottomGoalsCoordinates, { x: event.pageX, y: event.pageY }))
                    {
                        document.removeEventListener("mousemove", ft_mouseMove)
                        if(!flag)
                            setFlag(true)
                    }
            elem.style.top = event.pageY - innerTouch.y + 25 + 'px';
            elem.style.left = event.pageX - innerTouch.x + 25 + 'px';
            elem.addEventListener("mouseup", 
                () => document.removeEventListener("mousemove", ft_mouseMove));
        }
        
        document.addEventListener("mousemove", ft_mouseMove);
    }

    useEffect(() => {
        if (image)
            image.addEventListener("touchstart", ft_startTouch, { passive: false })
    })

    return (
        <img 
            ref = { ref => image = ref }
            onMouseDown= { (e) => ft_startDrag(e)}
            className={style.ball}
            src={img}
            alt="Ball" />
    )
}

export default Ball;
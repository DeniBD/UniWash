
import CircularProgress from '@mui/material/CircularProgress';

import WeekCardCSS from './WeekCard.module.css';
import React from 'react';

function WeekCard ( props: { title: string; percent: number; primary_color: string; secondary_color: string } ) {
    return (
        <div style={{ backgroundColor: props.primary_color}} className={WeekCardCSS["card"]}>
            <div className={WeekCardCSS["title"]}>
                {props.title}
            </div>
            <div className={WeekCardCSS["progress_circle"]}>
                <CircularProgress variant="determinate" value={100} style={{ position: "absolute", color: props.secondary_color, width: "80px", height: "80px" }} />
                <CircularProgress variant="determinate" value={props.percent} style={{ position: "absolute", color: "#ffffff", width: "80px", height: "80px" }} />
                <div className={WeekCardCSS["progress_circle_text"]}>
                    {props.percent}%
                </div>
            </div>
        </div>
    );
}

export default WeekCard;

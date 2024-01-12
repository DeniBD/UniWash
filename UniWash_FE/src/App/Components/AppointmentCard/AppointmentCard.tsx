
import React from 'react';
import Dots from '../../Assets/dots2.png';

import AppointmentCardCSS from './AppointmentCard.module.css';

function AppointmentCard ( props: { title: string; start_time: number; onClick?: any; } ) {
    return (
        <div className={AppointmentCardCSS["card"]} onClick={props.onClick}>
            <div className={AppointmentCardCSS["card_details"]}>
                <div className={AppointmentCardCSS["card_title"]}>
                    {props.title}
                </div>
                <div className={AppointmentCardCSS["card_time"]}>
                    {props.start_time}
                    {":00 - "}
                    {props.start_time + 2}
                    {":00"}
                </div>
            </div>
            <img src={Dots} alt="dots" className={AppointmentCardCSS["card_dots"]}/>
        </div>
    );
}

export default AppointmentCard;

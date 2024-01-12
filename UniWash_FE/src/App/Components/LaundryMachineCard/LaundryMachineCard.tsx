
import React from 'react';
import Dots from '../../Assets/dots2.png';

import LaundryMachineCardCSS from './LaundryMachineCard.module.css';

function LaundryMachineCard ( props: { title: string; onClick?: any; } ) {
    return (
        <div className={LaundryMachineCardCSS["card"]} onClick={props.onClick}>
            <div className={LaundryMachineCardCSS["card_details"]}>
                <div className={LaundryMachineCardCSS["card_title"]}>
                    {props.title}
                </div>
            </div>
            <img src={Dots} alt="dots" className={LaundryMachineCardCSS["card_dots"]}/>
        </div>
    );
}

export default LaundryMachineCard;

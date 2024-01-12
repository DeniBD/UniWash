
import React from 'react';
import StatisticsCardCSS from './StatisticsCard.module.css';

function StatisticsCard ( props: { title: string; content: number } ) {
    return (
        <div className={StatisticsCardCSS["card"]}>
            <div className={StatisticsCardCSS["card_title"]}>
                {props.title}
            </div>
            <div className={StatisticsCardCSS["card_content"]}>
                {props.content}
            </div>
        </div>
    );
}

export default StatisticsCard;

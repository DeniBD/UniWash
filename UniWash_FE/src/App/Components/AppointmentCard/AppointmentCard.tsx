import React from 'react';

interface TextBoxProps {
    date: string;
    time: string;
}

const AppointmentCard: React.FC<TextBoxProps> = ({ date, time }) => {
    return (
        <div className="text-box">
            <div>{date}</div>
            <div>{time}</div>
        </div>
    );
};

export default AppointmentCard;

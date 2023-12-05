import React from 'react';
import Menu from "../../Components/Menu/Menu";
import "./UserDashboard.css"
import stats from '../../Assets/stats.png'

interface CardProps {
    title: string;
    percentage: number;
    color?: string; // Optional color prop
}

const Card: React.FC<CardProps> = ({ title, percentage, color }) => {
    return (
        <div className="card" style={{ backgroundColor: color }}>
            <h3>{title}</h3>
            <p>{percentage}%</p>
        </div>
    );
};

function UserDashboard() {
    return (
        <div className="App">
            <Menu/>
            <div className="Content">

                <div className="Reservations">
                    <div className="Greeting">
                        Hello USER, welcome back!
                    </div>
                    <div className="Occupied">
                        <div className="Title">
                            Stare Ocupare Masini
                        </div>
                        <div className="Cards">
                            <Card title="Masini de spalat" percentage={75} color="#369FFF" />
                            <Card title="Uscatoare" percentage={50} color="#FF7E07" />
                        </div>
                    </div>
                    <div className="Current">
                        <div className="Title">
                            Rezervarile tale
                        </div>
                    </div>
                </div>

                <div className="Statistics">
                    <div className="Title">
                        Statistici
                    </div>
                    <img className="Stats" src={stats} alt={"stats"}/>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
import React from 'react';
import Menu from "../../Components/Menu/Menu";
import "./UserDashboard.css"
import stats from '../../Assets/stats.png'
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AppointmentCard from "../../Components/AppointmentCard/AppointmentCard";
import { Grid } from '@material-ui/core';

interface CardProps {
    title: string;
    percentage: number;
    color?: string;
}

const Card: React.FC<CardProps> = ({ title, percentage, color }) => {
    return (
        <div className="card" style={{ backgroundColor: color }}>
            <h3>{title}</h3>
            <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                    pathColor: "white",
                    trailColor: "rgba(240, 240, 240, 0.7)",
                    textColor: "white",
                })}
            />
        </div>
    );
};

function UserDashboard() {

    const date = '2023-12-06';
    const time = '03:00 PM-04:00 PM';

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
                            <Card title="Saptamana Curenta" percentage={75} color="#369FFF" />
                            <Card title="Saptamana Viitoare" percentage={50} color="#FF7E07" />
                        </div>
                    </div>
                    <div className="Current">
                        <div className="Title">
                            Rezervarile tale
                        </div>
                        <div className="Appointments">
                            <Grid container xs={12}>
                                <Grid item xs={6}>
                                    <AppointmentCard date={date} time={time} />
                                </Grid>
                                <Grid item xs={6}>
                                    <AppointmentCard date={date} time={time} />
                                </Grid>
                            </Grid>
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

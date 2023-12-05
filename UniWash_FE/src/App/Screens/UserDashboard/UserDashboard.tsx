import React from 'react';
import Menu from "../../Components/Menu/Menu";
import "./UserDashboard.css"
import stats from '../../Assets/stats.png'
function UserDashboard() {
    return (
        <div className="App">
            <Menu/>
            <div className="Content">
                <div className="Reservations">
                    <div className="Greeting">
                        Hello USER, welcome back!
                    </div>
                </div>
                <div className="Statistics">
                    Statistics here
                    <img className="Stats" src={stats} alt={"stats"}/>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;

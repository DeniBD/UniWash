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
                    <div className="Occupied">
                        <div className="Title">
                            Stare Masini
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

import React from 'react';
import Menu from "../../Components/Menu/Menu";
import "./UserDashboard.css"

function UserDashboard() {
    return (
        <div className="App">
            <Menu/>
            <div className="Content">
                <p>This is dashboard</p>
            </div>
        </div>
    );
}

export default UserDashboard;

import React from 'react';
import Menu from "../../Components/Menu/Menu";
import "./Messages.css"

function Messages() {
    return (
        <div className="App">
            <Menu/>
            <div className="Content">
                <p>This is messages</p>
            </div>
        </div>
    );
}

export default Messages;

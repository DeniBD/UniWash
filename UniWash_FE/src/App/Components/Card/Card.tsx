import React from 'react';
import Menu from "../../Components/Menu/Menu";
import "./Card.css"

function Card() {
    return (
        <div className="App">
            <Menu/>
            <div className="Content">
                <p>This is messages</p>
            </div>
        </div>
    );
}

export default Card;

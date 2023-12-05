import React from 'react';
import './Menu.css';
import {BiCategory, BiConversation, BiHome} from "react-icons/bi";
import myImage from "../../Assets/Time management-cuate.png"
import {Link, NavLink} from "react-router-dom";
function Menu()  {
    return (
        <div className="Menu">
            <div className="Title">UNIWASH</div>
            <div className="Links">
                <div className="MenuElem">
                    <NavLink to="/" className="active-link">
                        <BiHome />
                        <div>Dashboard</div>
                    </NavLink>
                </div>
                <div className="MenuElem">
                    <NavLink to="/reservations" className="active-link">
                        <BiCategory />
                        <div>Planificari</div>
                    </NavLink>
                </div>
                <div className="MenuElem">
                    <NavLink to="/messages" className="active-link">
                        <BiConversation />
                        <a>Mesaje</a>
                    </NavLink>
                </div>
            </div>
            <div>
                <img className="Photo" src={myImage} alt="photo"/>
            </div>
            <div className="Decoration"></div>
        </div>
    );
}

export default Menu;

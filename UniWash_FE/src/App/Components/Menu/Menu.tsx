import React from 'react';
import './Menu.css';
import {BiCategory, BiConversation, BiHome} from "react-icons/bi";
import myImage from "../../Assets/Time management-cuate.png"
import {NavLink} from "react-router-dom";
function Menu()  {
    return (
        <div className="Menu">
            {/* <div><img className="Title" src={require('../../Assets/UniWash.png')} alt="Logo"/></div> */}
            <div className="Title">UniWash</div>
            <div className="Links">
                <div className="MenuElem">
                    <NavLink to="/dashboard" className="active-link">
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
                        <div>Mesaje</div>
                    </NavLink>
                </div>
            </div>
            <div>
                <img className="Photo" src={myImage} alt="Person"/>
            </div>
            <div className="Decoration"></div>
        </div>
    );
}

export default Menu;

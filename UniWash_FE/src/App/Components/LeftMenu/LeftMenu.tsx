
import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import LeftMenuCSS from './LeftMenu.module.css';
import Time from '../../Assets/time.png';
import React from 'react';

function LeftMenu ( props: { selected: string } ) {
    const navigate = useNavigate();

    var selected = props.selected;

    return (
        <div className={LeftMenuCSS["container"]}>
            <div className={LeftMenuCSS["title"]}>
                UNIWASH
            </div>
            
            {selected === "Dashboard" ? (
                <div className={LeftMenuCSS["selected_button"]} onClick={() => {navigate("/dashboard")}}>
                <HomeOutlinedIcon className={LeftMenuCSS["icon"]} onClick={() => {navigate("/dashboard")}} />
                    Dashboard
                </div>
            ) : (
                <div className={LeftMenuCSS["button"]} onClick={() => {navigate("/dashboard")}}>
                    <HomeOutlinedIcon className={LeftMenuCSS["icon"]} onClick={() => {navigate("/dashboard")}} />
                    Dashboard
                </div>
            )}
            {selected === "Planificari" ? (
                <div className={LeftMenuCSS["selected_button"]} onClick={() => {navigate("/planificari")}}>
                    <AppsOutlinedIcon className={LeftMenuCSS["icon"]} onClick={() => {navigate("/planificari")}} />
                    Planificari
                </div>
            ) : (
                <div className={LeftMenuCSS["button"]} onClick={() => {navigate("/planificari")}}>
                    <AppsOutlinedIcon className={LeftMenuCSS["icon"]} onClick={() => {navigate("/planificari")}} />
                    Planificari
                </div>
            )}
            {selected === "Mesaje" ? (
                <div className={LeftMenuCSS["selected_button"]}>
                    <SmsRoundedIcon className={LeftMenuCSS["icon"]} />
                    Mesaje
                </div>
            ) : (
                <div className={LeftMenuCSS["button"]}>
                    <SmsRoundedIcon className={LeftMenuCSS["icon"]} />
                    Mesaje
                </div>
            )}
             <div>
                    <img className={LeftMenuCSS["time_photo"]} src={Time} alt="time" />
            </div>
        </div>
    );
}

export default LeftMenu;

import { useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SmsRoundedIcon from '@mui/icons-material/SmsRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import LeftMenuCSS from './LeftMenu.module.css';
import Time from '../../Assets/time.png';
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useUser } from '../ClientContext/ClientContext';


function LeftMenu ( props: { selected: string } ) {
    const clientId = "21799809046-p643b3dhbgpbqsfrujgp23vndshpu4so.apps.googleusercontent.com";

    const navigate = useNavigate();
    const { setUser } = useUser();

    var selected = props.selected;

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    const handleLogoutClient = () => {

        try {
            setUser(null);
            localStorage.clear();
            navigate('/');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div className={LeftMenuCSS["container"]}>
            <div className={LeftMenuCSS["title"]}>
                UniWash
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
                    Planificări
                </div>
            ) : (
                <div className={LeftMenuCSS["button"]} onClick={() => {navigate("/planificari")}}>
                    <AppsOutlinedIcon className={LeftMenuCSS["icon"]} onClick={() => {navigate("/planificari")}} />
                    Planificări
                </div>
            )}
            {/* {selected === "Mesaje" ? (
                <div className={LeftMenuCSS["selected_button"]}>
                    <SmsRoundedIcon className={LeftMenuCSS["icon"]} />
                    Mesaje
                </div>
            ) : (
                <div className={LeftMenuCSS["button"]}>
                    <SmsRoundedIcon className={LeftMenuCSS["icon"]} />
                    Mesaje
                </div>
            )} */}
             <div>
                    <img className={LeftMenuCSS["time_photo"]} src={Time} alt="time" />
            </div>
            { localStorage.getItem('google') === "true" ? (
                <div >
                    <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={handleLogout}
                        />

                </div>
            ) : (
                <div id="signOutButton" onClick={handleLogoutClient} className={LeftMenuCSS["button"]}>
                    <LogoutIcon className={LeftMenuCSS["icon"]} />
                    Logout
                </div>
            )}
        </div>
    );
}

export default LeftMenu;
import { useState, useEffect } from "react";

import axios from "axios";

import AdminDashboardCSS from "./AdminDashboard.module.css";

import Stats from "../../Assets/stats.png";

import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import WeekCard from "../../Components/WeekCard/WeekCard";
import StatisticsCard from "../../Components/StatisticsCard/StatisticsCard";
import CurrentBookingsContainer from "../../Components/CurrentBookingsContainer/CurrentBookingsContainer";
import React from "react";
import DashboardCSS from "../Dashboard/Dashboard.module.css";

function AdminDashboard() {
    const [bookedSpotsInCurrentWeek, setBookedSpotsInCurrentWeek] = useState(0);
    const [bookedSpotsInNextWeek, setBookedSpotsInNextWeek] = useState(0);

    useEffect(() => {
        const getBookedSpotsInCurrentWeek = async () => {
            await axios.post(
                "http://localhost:8090/bookings/booked-spots-in-current-week",
                {
                    id: 1,
                    name: "C13",
                    laundryMachines: [],
                }
            ).then((response) => {

                setBookedSpotsInCurrentWeek(response.data);});
        };

        const getBookedSpotsInNextWeek = async () => {
            await axios.post(
                "http://localhost:8090/bookings/booked-spots-in-next-week",
                {
                    id: 1,
                    name: "C13",
                    laundryMachines: [],
                }
            ).then((response) => {

                setBookedSpotsInNextWeek(response.data);});
        };

        getBookedSpotsInCurrentWeek();
        getBookedSpotsInNextWeek();
    }, []);

    return (
        <div className={AdminDashboardCSS["page"]}>
            <div className={AdminDashboardCSS["menu_container"]}>
                <LeftMenu selected="Dashboard" />
            </div>

            <div className={AdminDashboardCSS["content_container"]}>
                <div className={AdminDashboardCSS["welcome_message"]}>
                    {"Hello"}
                    &nbsp;
                    <b>USER</b>
                    {", welcome back!"}
                </div>

                <div className={AdminDashboardCSS["rezerva_container"]}>
                    <div className={AdminDashboardCSS["rezerva_title"]}>Rezervări</div>
                    <div className={AdminDashboardCSS["rezerva_cards_container"]}>
                        <div className={AdminDashboardCSS["rezerva_card"]}>
                            <WeekCard
                                title="Săptămâna curentă"
                                percent={bookedSpotsInCurrentWeek}
                                primary_color="#369fff"
                                secondary_color="#208bee"
                            />
                        </div>
                        <div className={DashboardCSS["rezerva_card"]}>
                            <WeekCard
                                title="Săptămâna următoare"
                                percent={bookedSpotsInNextWeek}
                                primary_color="#ff993a"
                                secondary_color="#ff7e07"
                            />
                        </div>
                    </div>
                </div>

                {/*<div className={AdminDashboardCSS["rezervari_curente_container"]}>*/}
                {/*    <CurrentBookingsContainer /> */}
                {/*</div>*/}
            </div>

            <div className={AdminDashboardCSS["statistics_container"]}>
                {/* <div className={DashboardCSS["statistics_title"]}>
					Statistici
				</div> */}
                <div className={AdminDashboardCSS["statistics_cards_container"]}>
                    <div className={AdminDashboardCSS["statistics_card"]}>
                        <StatisticsCard title="Numar spalari" content={10} />
                    </div>
                    <div className={AdminDashboardCSS["statistics_card"]}>
                        <StatisticsCard title="Numar spalari" content={10} />
                    </div>
                </div>
                <div className={AdminDashboardCSS["statistics_photo_container"]}>
                    <img
                        src={Stats}
                        alt="stats"
                        className={AdminDashboardCSS["statistics_photo"]}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;

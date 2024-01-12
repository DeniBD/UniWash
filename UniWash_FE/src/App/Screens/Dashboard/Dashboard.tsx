import { useState, useEffect } from "react";

import axios from "axios";

import DashboardCSS from "./Dashboard.module.css";

import Stats from "../../Assets/stats.png";

import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import WeekCard from "../../Components/WeekCard/WeekCard";
import StatisticsCard from "../../Components/StatisticsCard/StatisticsCard";
import CurrentBookingsContainer from "../../Components/CurrentBookingsContainer/CurrentBookingsContainer";
import React from "react";

function Dashboard() {
	const [bookedSpotsInCurrentWeek, setBookedSpotsInCurrentWeek] = useState(0);
	const [bookedSpotsInNextWeek, setBookedSpotsInNextWeek] = useState(0);

	useEffect(() => {
		const getBookedSpotsInCurrentWeek = async () => {
			const response = await axios.post(
				"http://localhost:8090/bookings/booked-spots-in-current-week",
				{
					id: 1,
					name: "C13",
					laundryMachines: [],
				}
			);

			setBookedSpotsInCurrentWeek(response.data);
		};

		const getBookedSpotsInNextWeek = async () => {
			const response = await axios.post(
				"http://localhost:8090/bookings/booked-spots-in-next-week",
				{
					id: 1,
					name: "C13",
					laundryMachines: [],
				}
			);

			setBookedSpotsInNextWeek(response.data);
		};

		getBookedSpotsInCurrentWeek();
		getBookedSpotsInNextWeek();
	}, []);

	return (
		<div className={DashboardCSS["page"]}>
			<div className={DashboardCSS["menu_container"]}>
				<LeftMenu selected="Dashboard" />
			</div>

			<div className={DashboardCSS["content_container"]}>
				<div className={DashboardCSS["welcome_message"]}>
					{"Hello"}
					&nbsp;
					<b>USER</b>
					{", welcome back!"}
				</div>

				<div className={DashboardCSS["rezerva_container"]}>
					<div className={DashboardCSS["rezerva_title"]}>Rezervări</div>
					<div className={DashboardCSS["rezerva_cards_container"]}>
						<div className={DashboardCSS["rezerva_card"]}>
							<WeekCard
								title="Saptamana curenta"
								percent={bookedSpotsInCurrentWeek}
								primary_color="#369fff"
								secondary_color="#208bee"
							/>
						</div>
						<div className={DashboardCSS["rezerva_card"]}>
							<WeekCard
								title="Saptamana urmatoare"
								percent={bookedSpotsInNextWeek}
								primary_color="#ff993a"
								secondary_color="#ff7e07"
							/>
						</div>
					</div>
				</div>

				<div className={DashboardCSS["rezervari_curente_container"]}>
					<CurrentBookingsContainer />
				</div>
			</div>

			<div className={DashboardCSS["statistics_container"]}>
				{/* <div className={DashboardCSS["statistics_title"]}>
					Statistici
				</div> */}
				<div className={DashboardCSS["statistics_cards_container"]}>
					<div className={DashboardCSS["statistics_card"]}>
						<StatisticsCard title="Numar spalari" content={10} />
					</div>
					<div className={DashboardCSS["statistics_card"]}>
						<StatisticsCard title="Numar spalari" content={10} />
					</div>
				</div>
				<div className={DashboardCSS["statistics_photo_container"]}>
					<img
						src={Stats}
						alt="stats"
						className={DashboardCSS["statistics_photo"]}
					/>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
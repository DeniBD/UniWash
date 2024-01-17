import { useState, useEffect } from "react";

import axios from "axios";

import DashboardCSS from "./Dashboard.module.css";

import Stats from "../../Assets/stats.png";

import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import WeekCard from "../../Components/WeekCard/WeekCard";
import StatisticsCard from "../../Components/StatisticsCard/StatisticsCard";
import CurrentBookingsContainer from "../../Components/CurrentBookingsContainer/CurrentBookingsContainer";
import User from "../../Interfaces/User";

function Dashboard() {
	const [bookedSpotsInCurrentWeek, setBookedSpotsInCurrentWeek] = useState(0);
	const [bookedSpotsInNextWeek, setBookedSpotsInNextWeek] = useState(0);
	const [bookedSpotsByUser, setBookedSpotsByUser] = useState(0);
	const [user, setUser] = useState<User>({ id: 0, email: "", dormitory: { id: 0, name: "", laundryMachines: [] }, password: "", phone_number: "", is_admin: false, bookings: [] });

	useEffect(() => {
		const getBookedSpotsByUser = async () => {
			await axios.get(
				"http://localhost:8090/bookings/" + user.id,
			).then((response) => {

			setBookedSpotsByUser(response.data.length/2);});
		}

		const getBookedSpotsInCurrentWeek = async () => {
			await axios.post(
				"http://localhost:8090/bookings/booked-spots-in-current-week",
				user.dormitory
			).then((response) => {

			setBookedSpotsInCurrentWeek(response.data);});
		};

		const getBookedSpotsInNextWeek = async () => {
			await axios.post(
				"http://localhost:8090/bookings/booked-spots-in-next-week",
				user.dormitory
			).then((response) => {

			setBookedSpotsInNextWeek(response.data);});
		};

		getBookedSpotsInCurrentWeek();
		getBookedSpotsInNextWeek();
		getBookedSpotsByUser();

	}, [user]);

	useEffect(() => {

		const getUserByEmail = async () => {
			const email = localStorage.getItem('email');

			const response = await axios.get(
				"http://localhost:8090/users/email/" + email
			);

			setUser(response.data);
		};
		getUserByEmail();
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

				<div className={DashboardCSS["rezervari_curente_container"]}>
					<CurrentBookingsContainer/>
				</div>
			</div>

			<div className={DashboardCSS["statistics_container"]}>
				{/* <div className={DashboardCSS["statistics_title"]}>
					Statistici
				</div> */}
				<div className={DashboardCSS["statistics_cards_container"]}>
					<div className={DashboardCSS["statistics_card"]}>
						<StatisticsCard title="Numar spalari" content={bookedSpotsByUser} />
					</div>
					{/* <div className={DashboardCSS["statistics_card"]}>
						<StatisticsCard title="Numar spalari" content={10} />
					</div> */}
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
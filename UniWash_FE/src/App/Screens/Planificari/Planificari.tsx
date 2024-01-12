import { useEffect, useState } from "react";

import axios from "axios";

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import PlanificariCSS from "./Planificari.module.css";
import Stats from "../../Assets/stats.png";
import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import AppointmentCard from "../../Components/AppointmentCard/AppointmentCard";
import DashboardCSS from "../Dashboard/Dashboard.module.css";
import StatisticsCard from "../../Components/StatisticsCard/StatisticsCard";
import CurrentBookingsContainer from "../../Components/CurrentBookingsContainer/CurrentBookingsContainer";

import LaundryMachine from "../../Interfaces/LaundryMachine";
import AvailableBookingSpot from "../../Interfaces/AvailableBookingSpot";
import LaundryMachineCard from "../../Components/LaundryMachineCard/LaundryMachineCard";
import React from "react";

function Planificari() {
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs("2024-01-03"));

	const [laundryMachines, setLaundryMachines] = useState<LaundryMachine[]>([]);

	const [defaultView, setDefaultView] = useState(true);
	const [selectedMachine, setSelectedMachine] = useState<LaundryMachine | null>(null);

	const [availableBookingSpots, setAvailableBookingSpots] = useState<AvailableBookingSpot[]>([]);

	useEffect(() => {
		const getLaundryMachines = async () => {
			const dormitoryId = 1;

			await axios.get(
				"http://localhost:8090/laundry-machine/" + dormitoryId
			).then((response) => {
				const tmp = response.data as LaundryMachine[];

				let i = 0;
				while (i < tmp.length) {
					if (tmp[i].type === "DRYING_MACHINE") {
						tmp.splice(i, 1);
						i--;
					}
					i++;
				}

				setLaundryMachines(tmp);
			});
		};

		getLaundryMachines();
	}, []);

	useEffect(() => {
		const getAvailableBookingSpots = async () => {
			if (selectedMachine) {
				await axios.get(
					"http://localhost:8090/bookings/available-spots/" + selectedMachine?.id + "/" + selectedDate?.format("YYYY-MM-DD")
				).then((response) => {
					setAvailableBookingSpots(response.data);
				});
			}
		};

		getAvailableBookingSpots();
	}, [selectedMachine, defaultView, selectedDate]);

	return (
		<div className={PlanificariCSS["page"]}>
			<div className={PlanificariCSS["menu_container"]}>
				<LeftMenu selected="Planificari" />
			</div>

			<div className={PlanificariCSS["content_container"]}>
				<div className={PlanificariCSS["welcome_message"]}>
					{"Hello"}
					&nbsp;
					<b>USER</b>
					{", welcome back!"}
				</div>

				<div className={PlanificariCSS["rezerva_container"]}>
					<div className={PlanificariCSS["rezerva_title"]}>
						<div className={PlanificariCSS["rezerva_title_text"]}>
							Rezerva masina de spalat
						</div>
						<div className={PlanificariCSS["rezerva_title_button"]} onClick={() => { setDefaultView(true) }}>
							Back
						</div>
						<div className={PlanificariCSS["rezerva_title_datepicker"]}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									sx = {{
										'& .MuiOutlinedInput-notchedOutline': {
											border: 'none',
										},
										width: "150px"
									}}
									value={selectedDate}
									onChange={(newSelectedDate) => {
										setSelectedDate(newSelectedDate)
									}}
								/>
							</LocalizationProvider>
						</div>
					</div>

					{defaultView ? (
						<div className={PlanificariCSS["rezerva_cards_container"]}>
							<div
								className={
									PlanificariCSS["rezerva_cards_container_left"]
								}
							>
								{laundryMachines.map((laundryMachine, index) => {
									if (index % 2 === 0)
										return (
											<div
												className={
													PlanificariCSS[
														"rezervari_disponibile_card"
													]
												}
											>
												<LaundryMachineCard
													title={laundryMachine.name}
													onClick={() => {
														setDefaultView(false);
														setSelectedMachine(laundryMachine);
													}}
												/>
											</div>
										);
								})}
							</div>
							<div
								className={
									PlanificariCSS["rezerva_cards_container_right"]
								}
							>
								{laundryMachines.map((laundryMachine, index) => {
									if (index % 2 === 1)
										return (
											<div
												className={
													PlanificariCSS[
														"rezervari_disponibile_card"
													]
												}
											>
												<LaundryMachineCard
													title={laundryMachine.name}
													onClick={() => {
														setDefaultView(false);
														setSelectedMachine(laundryMachine);
													}}
												/>
											</div>
										);
								})}
							</div>
						</div>
					) : (
						<div className={PlanificariCSS["rezerva_cards_container"]}>
							<div
								className={
									PlanificariCSS["rezerva_cards_container_left"]
								}
							>
								{availableBookingSpots.map((availableBookingSpot, index) => {
									if (index % 2 === 0)
										return (
											<div
												className={
													PlanificariCSS[
														"rezervari_disponibile_card"
													]
												}
											>
												<AppointmentCard
													title={selectedMachine?.name as string}
													start_time={
														parseInt(availableBookingSpot.time.substring(0, availableBookingSpot.time.indexOf(":")))
													}
												/>
											</div>
										);
								})}
							</div>
							<div
								className={
									PlanificariCSS["rezerva_cards_container_right"]
								}
							>
								{availableBookingSpots.map((availableBookingSpot, index) => {
									if (index % 2 === 1)
										return (
											<div
												className={
													PlanificariCSS[
														"rezervari_disponibile_card"
													]
												}
											>
												<AppointmentCard
													title={selectedMachine?.name as string}
													start_time={
														parseInt(availableBookingSpot.time.substring(0, availableBookingSpot.time.indexOf(":")))
													}
												/>
											</div>
										);
								})}
							</div>
						</div>
					)}
				</div>

				<div className={DashboardCSS["rezervari_curente_container"]}>
					<CurrentBookingsContainer />
				</div>
			</div>

			<div className={DashboardCSS["statistics_container"]}>
				<div className={DashboardCSS["statistics_title"]}>
					Statistici
				</div>
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

export default Planificari;

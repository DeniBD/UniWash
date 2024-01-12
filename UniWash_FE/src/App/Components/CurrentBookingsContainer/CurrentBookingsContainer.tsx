import { useState, useEffect } from "react";

import axios from "axios";

import Switch from "@mui/material/Switch";

import CurrentBookingsContainerCSS from "./CurrentBookingsContainer.module.css";

import AppointmentCard from "../../Components/AppointmentCard/AppointmentCard";

import Booking from "../../Interfaces/Booking";
import React from "react";

function CurrentBookingsContainer() {
	const [checked, setChecked] = useState(false);

	const [bookingsInCurrentWeekByUser, setBookingsInCurrentWeekByUser] =
		useState<Booking[]>([]);
	const [bookingsInNextWeekByUser, setBookingsInNextWeekByUser] = useState<
		Booking[]
	>([]);

	useEffect(() => {
		const getBookingsInCurrentWeekByUser = async () => {
			const userId = 1;

			const response = await axios.get(
				"http://localhost:8090/bookings/bookings-in-current-week/" +
					userId
			);

			setBookingsInCurrentWeekByUser(response.data);
		};

		const getBookingsInNextWeekByUser = async () => {
			const userId = 1;

			const response = await axios.get(
				"http://localhost:8090/bookings/bookings-in-next-week/" + userId
			);

			setBookingsInNextWeekByUser(response.data);
		};

		getBookingsInCurrentWeekByUser();
		getBookingsInNextWeekByUser();
	}, []);

	return (
		<>
			{checked ? (
				<>
					<div
						className={
							CurrentBookingsContainerCSS[
								"rezervari_curente_title_container"
							]
						}
					>
						<div
							className={
								CurrentBookingsContainerCSS[
									"rezervari_curente_title"
								]
							}
						>
							Rezervari curente
						</div>
						<div
							className={
								CurrentBookingsContainerCSS["switch_saptamana"]
							}
						>
							<Switch
								checked={checked}
								onChange={() => {
									setChecked(!checked);
								}}
							/>
							<div
								className={
									CurrentBookingsContainerCSS[
										"switch_saptamana_text"
									]
								}
							>
								Saptamana urmatoare
							</div>
						</div>
					</div>
					<div
						className={
							CurrentBookingsContainerCSS[
								"rezervari_curente_cards_container"
							]
						}
					>
						{bookingsInNextWeekByUser.map((booking, index) => {
							return (
								<div
									className={
										CurrentBookingsContainerCSS[
											"rezervari_curente_card"
										]
									}
								>
									<AppointmentCard
										title={booking.laundry.name}
										start_time={parseInt(
											booking.startTime.substring(
												0,
												booking.startTime.indexOf(":")
											)
										)}
									/>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<>
					<div
						className={
							CurrentBookingsContainerCSS[
								"rezervari_curente_title_container"
							]
						}
					>
						<div
							className={
								CurrentBookingsContainerCSS[
									"rezervari_curente_title"
								]
							}
						>
							Rezervari curente
						</div>
						<div
							className={
								CurrentBookingsContainerCSS["switch_saptamana"]
							}
						>
							<Switch
								checked={checked}
								onChange={() => {
									setChecked(!checked);
								}}
							/>
							<div
								className={
									CurrentBookingsContainerCSS[
										"switch_saptamana_text"
									]
								}
							>
								Saptamana curenta
							</div>
						</div>
					</div>
					<div
						className={
							CurrentBookingsContainerCSS[
								"rezervari_curente_cards_container"
							]
						}
					>
						{bookingsInCurrentWeekByUser.map((booking, index) => {
							return (
								<div
									className={
										CurrentBookingsContainerCSS[
											"rezervari_curente_card"
										]
									}
								>
									<AppointmentCard
										title={booking.laundry.name}
										start_time={parseInt(
											booking.startTime.substring(
												0,
												booking.startTime.indexOf(":")
											)
										)}
									/>
								</div>
							);
						})}
					</div>
				</>
			)}
		</>
	);
}

export default CurrentBookingsContainer;

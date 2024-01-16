import { useState, useEffect } from "react";

import axios from "axios";

import Switch from "@mui/material/Switch";

import CurrentBookingsContainerCSS from "./CurrentBookingsContainer.module.css";

import AppointmentCard from "../../Components/AppointmentCard/AppointmentCard";

import Booking from "../../Interfaces/Booking";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function CurrentBookingsContainer() {
	const [checked, setChecked] = useState(false);

	const [bookingsInCurrentWeekByUser, setBookingsInCurrentWeekByUser] =
		useState<Booking[]>([]);
	const [bookingsInNextWeekByUser, setBookingsInNextWeekByUser] = useState<
		Booking[]
	>([]);

	const [bookingId, setBookingId] = useState(0);

	const [open, setOpen] = useState(false);

	const handleOpen = (bookingId: number) => {
		setBookingId(bookingId);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

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

	}, [checked]);

	const deleteBooking = async () => {
		await axios.delete(
			"http://localhost:8090/bookings/" + bookingId
		);

		handleClose();
		window.location.reload();
	}

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
								Săptamâna următoare
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
									onClick={() => handleOpen(booking.id)}
								>
									<AppointmentCard
										title={
											index === 0
												? "Masina " +
												  booking.laundry.name
												: "Uscator " +
												  booking.laundry.name
										}
										start_time={parseInt(
											booking.startTime.substring(
												0,
												booking.startTime.indexOf(":")
											)
										)}
										date={booking.date}
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
								Săptamâna curentă
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
									onClick={() => handleOpen(booking.id)}
								>
									<AppointmentCard
										title={
											index === 0
												? "Masina " +
												  booking.laundry.name
												: "Uscator " +
												  booking.laundry.name
										}
										start_time={parseInt(
											booking.startTime.substring(
												0,
												booking.startTime.indexOf(":")
											)
										)}
										date={booking.date}
									/>
								</div>
							);
						})}
					</div>
				</>
			)}

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Dorești să anulezi rezervarea?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description"></DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Nu</Button>
					<Button onClick={deleteBooking} autoFocus>
						Da
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default CurrentBookingsContainer;
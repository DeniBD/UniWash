import { useEffect, useState } from "react";

import axios from "axios";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import PlanificariCSS from "./Planificari.module.css";
import Stats from "../../Assets/stats.png";

import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import AppointmentCard from "../../Components/AppointmentCard/AppointmentCard";
import StatisticsCard from "../../Components/StatisticsCard/StatisticsCard";
import CurrentBookingsContainer from "../../Components/CurrentBookingsContainer/CurrentBookingsContainer";

import LaundryMachine from "../../Interfaces/LaundryMachine";
import AvailableBookingSpot from "../../Interfaces/AvailableBookingSpot";
import LaundryMachineCard from "../../Components/LaundryMachineCard/LaundryMachineCard";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Planificari() {
	const [key, setKey] = useState(0);

	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

	const [laundryMachines, setLaundryMachines] = useState<LaundryMachine[]>(
		[]
	);

	const [defaultView, setDefaultView] = useState(true);
	const [selectedMachine, setSelectedMachine] =
		useState<LaundryMachine | null>(null);

	const [startTime, setStartTime] = useState("");

	const [availableBookingSpots, setAvailableBookingSpots] = useState<
		AvailableBookingSpot[]
	>([]);

	const [open, setOpen] = useState(false);

	const handleOpen = (startTime: string) => {
		setStartTime(startTime);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		const getLaundryMachines = async () => {
			const dormitoryId = 2;

			await axios
				.get("http://localhost:8090/laundry-machine/" + dormitoryId)
				.then((response) => {
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
				await axios
					.get(
						"http://localhost:8090/bookings/available-spots/" +
							selectedMachine?.id +
							"/" +
							selectedDate?.format("YYYY-MM-DD")
					)
					.then((response) => {
						setAvailableBookingSpots(response.data);
					});
			}
		};

		getAvailableBookingSpots();
	}, [selectedMachine, defaultView, selectedDate]);

	const bookWashingMachine = async () => {
		if (selectedMachine) {
			axios
				.post("http://localhost:8090/bookings", {
					id: null,
					date: selectedDate?.format("YYYY-MM-DD"),
					startTime: startTime,
					status: "Active",
					laundry: selectedMachine,
					user: {
						id: 1,
						email: "bran.alexandru1@gmail.com",
						password: "09112002",
						phoneNumber: "0773897833",
						is_admin: false,
						dormitory: null,
						bookingList: null,
					},
				})
				.then(() => {
					setKey(key + 1);
					handleClose();
				})
				.catch((error) => {
					console.log(error);
				});
		}

		setDefaultView(true);
	};

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
						<div
							className={PlanificariCSS["rezerva_title_button"]}
							onClick={() => {
								setDefaultView(true);
							}}
						>
							Mașini disponibile
						</div>
						<div
							className={
								PlanificariCSS["rezerva_title_datepicker"]
							}
						>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									sx={{
										"& .MuiOutlinedInput-notchedOutline": {
											border: "none",
										},
										width: "150px",
									}}
									value={selectedDate}
									onChange={(newSelectedDate) => {
										setSelectedDate(newSelectedDate);
									}}
								/>
							</LocalizationProvider>
						</div>
					</div>

					{defaultView ? (
						<div
							className={
								PlanificariCSS["rezerva_cards_container"]
							}
						>
							<div
								className={
									PlanificariCSS[
										"rezerva_cards_container_left"
									]
								}
							>
								{laundryMachines.map(
									(laundryMachine, index) => {
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
														title={
															laundryMachine.name
														}
														onClick={() => {
															setDefaultView(
																false
															);
															setSelectedMachine(
																laundryMachine
															);
														}}
													/>
												</div>
											);
									}
								)}
							</div>
							<div
								className={
									PlanificariCSS[
										"rezerva_cards_container_right"
									]
								}
							>
								{laundryMachines.map(
									(laundryMachine, index) => {
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
														title={
															laundryMachine.name
														}
														onClick={() => {
															setDefaultView(
																false
															);
															setSelectedMachine(
																laundryMachine
															);
														}}
													/>
												</div>
											);
									}
								)}
							</div>
						</div>
					) : (
						<div
							className={
								PlanificariCSS["rezerva_cards_container"]
							}
						>
							<div
								className={
									PlanificariCSS[
										"rezerva_cards_container_left"
									]
								}
							>
								{availableBookingSpots.map(
									(availableBookingSpot, index) => {
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
														title={
															("Masina " +
																selectedMachine?.name) as string
														}
														start_time={parseInt(
															availableBookingSpot.time.substring(
																0,
																availableBookingSpot.time.indexOf(
																	":"
																)
															)
														)}
														date={null}
														onClick={() => {
															handleOpen(
																availableBookingSpot.time
															);
														}}
													/>
												</div>
											);
									}
								)}
							</div>
							<div
								className={
									PlanificariCSS[
										"rezerva_cards_container_right"
									]
								}
							>
								{availableBookingSpots.map(
									(availableBookingSpot, index) => {
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
														title={
															("Masina " +
																selectedMachine?.name) as string
														}
														start_time={parseInt(
															availableBookingSpot.time.substring(
																0,
																availableBookingSpot.time.indexOf(
																	":"
																)
															)
														)}
														date={null}
														onClick={() => {
															handleOpen(
																availableBookingSpot.time
															);
														}}
													/>
												</div>
											);
									}
								)}
							</div>
						</div>
					)}
				</div>

				<div
					className={PlanificariCSS["rezervari_curente_container"]}
					key={key}
				>
					<CurrentBookingsContainer />
				</div>
			</div>

			<div className={PlanificariCSS["statistics_container"]}>
				{/* <div className={DashboardCSS["statistics_title"]}>
					Statistici
				</div> */}
				<div className={PlanificariCSS["statistics_cards_container"]}>
					<div className={PlanificariCSS["statistics_card"]}>
						<StatisticsCard title="Numar spalari" content={10} />
					</div>
					<div className={PlanificariCSS["statistics_card"]}>
						<StatisticsCard title="Numar spalari" content={10} />
					</div>
				</div>
				<div className={PlanificariCSS["statistics_photo_container"]}>
					<img
						src={Stats}
						alt="stats"
						className={PlanificariCSS["statistics_photo"]}
					/>
				</div>
			</div>

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Dorești să rezervi mașina de spălat?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Nu</Button>
					<Button onClick={bookWashingMachine} autoFocus>
						Da
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Planificari;

import { useEffect, useState } from "react";

import axios from "axios";

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import AdminPlanificariCSS from "./AdminPlanificari.module.css";
import Stats from "../../Assets/stats.png";

import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import AppointmentCard from "../../Components/AppointmentCard/AppointmentCard";
import DashboardCSS from "../Dashboard/Dashboard.module.css";
import StatisticsCard from "../../Components/StatisticsCard/StatisticsCard";
import CurrentBookingsContainer from "../../Components/CurrentBookingsContainer/CurrentBookingsContainer";

import LaundryMachine from "../../Interfaces/LaundryMachine";
import AvailableBookingSpot from "../../Interfaces/AvailableBookingSpot";
import LaundryMachineCard from "../../Components/LaundryMachineCard/LaundryMachineCard";

function AdminPlanificari() {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    const [laundryMachines, setLaundryMachines] = useState<LaundryMachine[]>([]);

    const [defaultView, setDefaultView] = useState(true);
    const [selectedMachine, setSelectedMachine] = useState<LaundryMachine | null>(null);

    const [availableBookingSpots, setAvailableBookingSpots] = useState<AvailableBookingSpot[]>([]);

    useEffect(() => {
        const getLaundryMachines = async () => {
            const dormitoryId = 2;

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
        <div className={AdminPlanificariCSS["page"]}>
            <div className={AdminPlanificariCSS["menu_container"]}>
                <LeftMenu selected="Planificari" />
            </div>

            <div className={AdminPlanificariCSS["content_container"]}>
                <div className={AdminPlanificariCSS["welcome_message"]}>
                    {"Hello"}
                    &nbsp;
                    <b>USER</b>
                    {", welcome back!"}
                </div>

                <div className={AdminPlanificariCSS["rezerva_container"]}>
                    <div className={AdminPlanificariCSS["rezerva_title"]}>
                        <div className={AdminPlanificariCSS["rezerva_title_text"]}>
                            Adauga masina de spalat
                        </div>

                    </div>

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

export default AdminPlanificari;

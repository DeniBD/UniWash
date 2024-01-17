import { useEffect, useState } from "react";

import axios from "axios";

import AdminPlanificariCSS from "./AdminPlanificari.module.css";
import Stats from "../../Assets/stats.png";
import LaundryMachine from "../../Interfaces/LaundryMachine";

import LeftMenu from "../../Components/LeftMenu/LeftMenu";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {Button} from "@material-ui/core";
import PlanificariCSS from "../Planificari/Planificari.module.css";

function AdminPlanificari() {
    const [laundryMachine, setLaundryMachine] = useState<LaundryMachine>({
        id: 0,
        name: "",
        type: "WASHING_MACHINE", // Default type
        studentDormitory: "",
        bookingList: [],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLaundryMachine({ ...laundryMachine, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // API call to add the laundry machine
            const response = await axios.post("http://localhost:8090/laundry-machine", laundryMachine);
            console.log("Laundry Machine Added:", laundryMachine);
        } catch (error) {
            console.error("Error adding laundry machine:", error);
        }
    };

    return (
        <div className={AdminPlanificariCSS["page"]}>
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
                {/*<div className={PlanificariCSS["rezerva_container"]}>*/}
                    <form onSubmit={handleSubmit} className={PlanificariCSS["rezerva_container"]}>
                        <TextField
                            label="Machine Name"
                            name="name"
                            value={laundryMachine.name}
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                        />
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend">Machine Type</FormLabel>
                            <RadioGroup
                                row
                                name="type"
                                value={laundryMachine.type}
                                onChange={handleInputChange}
                            >
                                <FormControlLabel value="WASHING_MACHINE" control={<Radio />} label="Washing Machine" />
                                <FormControlLabel value="DRYING_MACHINE" control={<Radio />} label="Drying Machine" />
                            </RadioGroup>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                            Add Machine
                        </Button>
                    </form>
                {/*</div>*/}
            </div>
        </div>
    );
}

export default AdminPlanificari;

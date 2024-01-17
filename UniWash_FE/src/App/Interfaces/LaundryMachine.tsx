
import BookingDetails from "./BookingDetails";

interface LaundryMachine {
    id: number;
    name: string;
    type: string;
    studentDormitory?: string;
    bookingList: BookingDetails[];
}

export default LaundryMachine;

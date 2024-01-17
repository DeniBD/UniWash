import Booking from "./Booking";
import Dormitory from "./Dormitory";

interface User {
    id: number;
    email: string;
    password: string;
    phone_number: string;
    is_admin: boolean;
    bookings: Booking[];
    dormitory: Dormitory;
}
export default User;
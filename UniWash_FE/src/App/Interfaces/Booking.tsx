
interface Booking {
    id: number;
    date: string;
    startTime: string;
    status: string;
    laundry: {
        id: number;
        name: string;
        type: string;
        studentDormitory?: string;
        bookingList?: string;
    };
    user: {
        id: number;
        email: string;
        password: string;
        phoneNumber: string;
        is_admin: boolean;
        dormitory?: string;
        bookingList?: string;
    }
}

export default Booking;


interface BookingDetails {
    id: number;
    date: string;
    startTime: string;
    status: string;
    laundry?: string;
    user?: string;
}

export default BookingDetails;

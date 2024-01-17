package com.example.uniwash_be.util;

import com.example.uniwash_be.dto.BookingDto;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.IntStream;

public class BookingUtil {

    private static final LocalTime BOOKING_START_TIME = LocalTime.of(8, 0);
    private static final LocalTime BOOKING_END_TIME = LocalTime.of(20, 0);

    public static boolean areBookingsInWeek(List<BookingDto> bookingDtos, LocalDate date) {
        LocalDateTime dateTime = date.atStartOfDay();
        LocalDateTime startOfWeek = dateTime.with(DayOfWeek.MONDAY).toLocalDate().atTime(BOOKING_START_TIME);
        LocalDateTime endOfWeek = dateTime.with(DayOfWeek.SUNDAY).toLocalDate().atTime(BOOKING_END_TIME);
        List<LocalDateTime> bookingsInCurrentWeek = bookingDtos.stream()
                .map(booking -> LocalDateTime.of(booking.date(), booking.startTime()))
                .filter(time -> time.isAfter(startOfWeek) && time.isBefore(endOfWeek))
                .toList();
        return !bookingsInCurrentWeek.isEmpty();
    }

    public static List<LocalTime> computeAvailableBookingTimes(List<BookingDto> bookingDtos, LocalDate day) {
        List<LocalTime> bookingHoursInDay = IntStream.range(8, 21)
                .filter(hour -> hour % 2 == 0)
                .mapToObj(hour -> LocalTime.of(hour, 0))
//                .filter(hour -> hour.isAfter(LocalTime.now()))
                .toList();

        if (day.isEqual(LocalDate.now())) {
            bookingHoursInDay = bookingHoursInDay.stream()
                    .filter(hour -> hour.isAfter(LocalTime.now()))
                    .toList();
        }

        List<LocalTime> existingBookingTimes = bookingDtos.stream()
                .map(BookingDto::startTime)
                .toList();

        return bookingHoursInDay.stream()
                .filter(b -> !existingBookingTimes.contains(b))
                .toList();
    }

}

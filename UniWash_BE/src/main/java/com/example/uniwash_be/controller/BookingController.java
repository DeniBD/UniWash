package com.example.uniwash_be.controller;

import com.example.uniwash_be.dto.AvailableBookingSpot;
import com.example.uniwash_be.dto.BookingDto;
import com.example.uniwash_be.dto.StudentDormitoryDto;
import com.example.uniwash_be.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("{userId}")
    public ResponseEntity<List<BookingDto>> bookingsByUser(@PathVariable Long userId) {
        List<BookingDto> bookingsByUser = bookingService.getBookingsByUser(userId);
        return ResponseEntity.ok(bookingsByUser);
    }

    @PostMapping
    public ResponseEntity<?> bookWashingMachine(@RequestBody BookingDto bookingDto) {
        try {
            bookingService.addBooking(bookingDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/dormitory/{dormitoryId}")
    public ResponseEntity<List<BookingDto>> bookingsByDormitory(@PathVariable Long dormitoryId) {
        List<BookingDto> bookingsByDormitory = bookingService.getAllBookingsInDormitory(dormitoryId);
        return ResponseEntity.ok(bookingsByDormitory);
    }

    @DeleteMapping("{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long bookingId) {
        bookingService.deleteBooking(bookingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("available-spots/{machineId}/{date}")
    public ResponseEntity<List<AvailableBookingSpot>> availableBookingSpotsForWashingMachine(@PathVariable Long machineId, @PathVariable LocalDate date) {
        List<AvailableBookingSpot> availableBookingSpots = bookingService.getAvailableSlotsForWashingMachine(machineId, date);
        return ResponseEntity.ok(availableBookingSpots);
    }

    @GetMapping("booked-spots-in-current-week")
    public ResponseEntity<Integer> getBookedSlotsForCurrentWeek(@RequestBody StudentDormitoryDto studentDormitoryDto){
        Integer availableBookingSpots = bookingService.getBookedSlotsForCurrentWeek(studentDormitoryDto);
        return ResponseEntity.ok(availableBookingSpots);
    }

    @GetMapping("booked-spots-in-next-week")
    public ResponseEntity<Integer> getBookedSlotsForNextWeek(@RequestBody StudentDormitoryDto studentDormitoryDto){
        Integer availableBookingSpots = bookingService.getBookedSlotsForNextWeek(studentDormitoryDto);
        return ResponseEntity.ok(availableBookingSpots);
    }
    @GetMapping("bookings-in-current-week/{userId}")
    public ResponseEntity<List<BookingDto>> getBookingsInCurrentWeekByUser(@PathVariable Long userId){
        List<BookingDto> bookingsInCurrentWeek = bookingService.getBookingsInCurrentWeekByUser(userId);
        return ResponseEntity.ok(bookingsInCurrentWeek);
    }

    @GetMapping("bookings-in-next-week/{userId}")
    public ResponseEntity<List<BookingDto>> getBookingsInNextWeekByUser(@PathVariable Long userId){
        List<BookingDto> bookingsInNextWeek = bookingService.getBookingsInNextWeekByUser(userId);
        return ResponseEntity.ok(bookingsInNextWeek);
    }


}
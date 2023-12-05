package com.example.uniwash_be.controller;

import com.example.uniwash_be.dto.BookingDto;
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
        bookingService.addBooking(bookingDto);
        return ResponseEntity.ok().build();
    }

}
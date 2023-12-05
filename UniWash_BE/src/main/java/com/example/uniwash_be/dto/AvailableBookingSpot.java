package com.example.uniwash_be.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record AvailableBookingSpot(LocalDate date, LocalTime time) {
}

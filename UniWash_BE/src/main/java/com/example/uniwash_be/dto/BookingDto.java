package com.example.uniwash_be.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record BookingDto(Long id,
                         LocalDate date,
                         LocalTime startTime,
                         String status,
                         LaundryMachineDto laundry,
                         UserDto user) {
}

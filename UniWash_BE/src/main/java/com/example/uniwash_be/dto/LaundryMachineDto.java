package com.example.uniwash_be.dto;

import com.example.uniwash_be.entity.enums.LaundryMachineType;

import java.util.List;

public record LaundryMachineDto(Long id,
                                String name,
                                LaundryMachineType type,
                                List<BookingDto> bookingList,
                                StudentDormitoryDto studentDormitory) {
}

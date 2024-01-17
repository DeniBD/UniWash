package com.example.uniwash_be.dto;

import java.util.List;

public record UserDto(Long id,
                      String email,
                      String password,
                      String phoneNumber,
                      boolean is_admin,
                      StudentDormitoryDto dormitory,
                      List<BookingDto> bookingList) {
}

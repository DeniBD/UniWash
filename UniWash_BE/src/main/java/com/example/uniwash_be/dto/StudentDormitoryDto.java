package com.example.uniwash_be.dto;

import java.util.List;

public record StudentDormitoryDto(Long id,
                                  String name,
                                  List<LaundryMachineDto> laundryMachines) {
}

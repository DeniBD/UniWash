package com.example.uniwash_be.dto;

import com.example.uniwash_be.entity.StudentDormitory;
import com.example.uniwash_be.entity.enums.LaundryMachineType;

public record LaundryMachineDto(Long id,
                                String name,
                                LaundryMachineType type,
                                DormitoryDto dormitory) {
}

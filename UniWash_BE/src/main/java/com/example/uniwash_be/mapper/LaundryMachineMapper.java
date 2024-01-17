package com.example.uniwash_be.mapper;

import com.example.uniwash_be.dto.LaundryMachineDto;
import com.example.uniwash_be.entity.LaundryMachine;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class LaundryMachineMapper {

    public static LaundryMachine toEntity(LaundryMachineDto dto) {
        if (dto == null) {
            return null;
        }
        return new LaundryMachine(dto.id(), dto.name(), dto.type(), BookingMapper.toEntitiesWithoutCyclicDependency(dto.bookingList()),
                StudentDormitoryMapper.toEntityWithoutCyclicDependency(dto.studentDormitory()));
    }

    public static LaundryMachine toEntityWithoutCyclicDependency(LaundryMachineDto dto) {
        if (dto == null) {
            return null;
        }
        return new LaundryMachine(dto.id(), dto.name(), dto.type(), null, null);
    }

    public static LaundryMachineDto toDto(LaundryMachine entity) {
        if (entity == null) {
            return null;
        }
        return new LaundryMachineDto(entity.getId(), entity.getName(), entity.getType(),
                BookingMapper.toDtosWithoutCyclicDependency(entity.getBookingList()), StudentDormitoryMapper.toDtoWithoutCyclicDependency(entity.getStudentDormitory()));
    }

    public static LaundryMachineDto toDtoWithoutCyclicDependency(LaundryMachine entity) {
        if (entity == null) {
            return null;
        }
        return new LaundryMachineDto(entity.getId(), entity.getName(), entity.getType(), null, null);
    }

    public static List<LaundryMachine> toEntities(List<LaundryMachineDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(LaundryMachineMapper::toEntity)
                .collect(Collectors.toList());
    }

    public static List<LaundryMachine> toEntitiesWithoutCyclicDependency(List<LaundryMachineDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(LaundryMachineMapper::toEntityWithoutCyclicDependency)
                .collect(Collectors.toList());
    }

    public static List<LaundryMachineDto> toDtos(List<LaundryMachine> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(LaundryMachineMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<LaundryMachineDto> toDtosWithoutCyclicDependency(List<LaundryMachine> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(LaundryMachineMapper::toDtoWithoutCyclicDependency)
                .collect(Collectors.toList());
    }
}

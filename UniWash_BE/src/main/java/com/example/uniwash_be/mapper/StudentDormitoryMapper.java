package com.example.uniwash_be.mapper;

import com.example.uniwash_be.dto.StudentDormitoryDto;
import com.example.uniwash_be.entity.StudentDormitory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class StudentDormitoryMapper {

    public static StudentDormitory toEntity(StudentDormitoryDto dto) {
        if (dto == null) {
            return null;
        }
        return new StudentDormitory(dto.id(), dto.name(), LaundryMachineMapper.toEntitiesWithoutCyclicDependency(dto.laundryMachines()));
    }

    public static StudentDormitory toEntityWithoutCyclicDependency(StudentDormitoryDto dto) {
        if (dto == null) {
            return null;
        }
        return new StudentDormitory(dto.id(), dto.name(), null);
    }

    public static StudentDormitoryDto toDto(StudentDormitory entity) {
        if (entity == null) {
            return null;
        }
        return new StudentDormitoryDto(entity.getId(), entity.getName(), LaundryMachineMapper.toDtosWithoutCyclicDependency(entity.getLaundryMachines()));
    }

    public static StudentDormitoryDto toDtoWithoutCyclicDependency(StudentDormitory entity) {
        if (entity == null) {
            return null;
        }
        return new StudentDormitoryDto(entity.getId(), entity.getName(), null);
    }

    public static List<StudentDormitory> toEntities(List<StudentDormitoryDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(StudentDormitoryMapper::toEntity)
                .collect(Collectors.toList());
    }

    public static List<StudentDormitory> toEntitiesWithoutCyclicDependency(List<StudentDormitoryDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(StudentDormitoryMapper::toEntityWithoutCyclicDependency)
                .collect(Collectors.toList());
    }

    public static List<StudentDormitoryDto> toDtos(List<StudentDormitory> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(StudentDormitoryMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<StudentDormitoryDto> toDtosWithoutCyclicDependency(List<StudentDormitory> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(StudentDormitoryMapper::toDtoWithoutCyclicDependency)
                .collect(Collectors.toList());
    }
}

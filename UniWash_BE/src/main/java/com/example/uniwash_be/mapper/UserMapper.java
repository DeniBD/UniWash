package com.example.uniwash_be.mapper;

import com.example.uniwash_be.dto.UserDto;
import com.example.uniwash_be.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserMapper {

    public static User toEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        return new User(dto.id(), dto.email(), dto.password(), dto.phoneNumber(), dto.is_admin(),
                StudentDormitoryMapper.toEntityWithoutCyclicDependency(dto.dormitory()), BookingMapper.toEntitiesWithoutCyclicDependency(dto.bookingList()));
    }

    public static User toEntityWithoutCyclicDependency(UserDto dto) {
        if (dto == null) {
            return null;
        }
        return new User(dto.id(), dto.email(), dto.password(), dto.phoneNumber(), dto.is_admin(), null, null);
    }

    public static UserDto toDto(User entity) {
        if (entity == null) {
            return null;
        }
        return new UserDto(entity.getId(), entity.getEmail(), entity.getPassword(), entity.getPhoneNumber(), entity.is_admin(),
                StudentDormitoryMapper.toDtoWithoutCyclicDependency(entity.getStudentDormitory()), BookingMapper.toDtosWithoutCyclicDependency(entity.getBookingList()));
    }

    public static UserDto toDtoWithoutCyclicDependency(User entity) {
        if (entity == null) {
            return null;
        }
        return new UserDto(entity.getId(), entity.getEmail(), entity.getPassword(), entity.getPhoneNumber(), entity.is_admin(), null, null);
    }

    public static List<User> toEntities(List<UserDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(UserMapper::toEntity)
                .collect(Collectors.toList());
    }

    public static List<User> toEntitiesWithoutCyclicDependency(List<UserDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(UserMapper::toEntityWithoutCyclicDependency)
                .collect(Collectors.toList());
    }

    public static List<UserDto> toDtos(List<User> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<UserDto> toDtosWithoutCyclicDependency(List<User> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(UserMapper::toDtoWithoutCyclicDependency)
                .collect(Collectors.toList());
    }
}

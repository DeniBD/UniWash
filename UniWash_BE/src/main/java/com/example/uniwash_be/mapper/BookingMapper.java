package com.example.uniwash_be.mapper;

import com.example.uniwash_be.dto.BookingDto;
import com.example.uniwash_be.entity.Booking;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
@Component
public class BookingMapper {

    public static Booking toEntity(BookingDto dto) {
        if (dto == null) {
            return null;
        }
        return new Booking(dto.id(), dto.date(), dto.startTime(), dto.status(),
                LaundryMachineMapper.toEntityWithoutCyclicDependency(dto.laundry()), UserMapper.toEntityWithoutCyclicDependency(dto.user()));
    }

    public static Booking toEntityWithoutCyclicDependency(BookingDto dto) {
        if (dto == null) {
            return null;
        }
        return new Booking(dto.id(), dto.date(), dto.startTime(), dto.status(), null, null);
    }

    public static BookingDto toDto(Booking entity) {
        if (entity == null) {
            return null;
        }
        return new BookingDto(entity.getId(), entity.getDate(), entity.getStartTime(), entity.getStatus(),
                LaundryMachineMapper.toDtoWithoutCyclicDependency(entity.getLaundryMachine()), UserMapper.toDtoWithoutCyclicDependency(entity.getUser()));
    }

    public static BookingDto toDtoWithoutCyclicDependency(Booking entity) {
        if (entity == null) {
            return null;
        }
        return new BookingDto(entity.getId(), entity.getDate(), entity.getStartTime(), entity.getStatus(), null, null);
    }

    public static List<Booking> toEntities(List<BookingDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(BookingMapper::toEntity)
                .collect(Collectors.toList());
    }

    public static List<Booking> toEntitiesWithoutCyclicDependency(List<BookingDto> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(BookingMapper::toEntityWithoutCyclicDependency)
                .collect(Collectors.toList());
    }

    public static List<BookingDto> toDtos(List<Booking> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(BookingMapper::toDto)
                .collect(Collectors.toList());
    }

    public static List<BookingDto> toDtosWithoutCyclicDependency(List<Booking> entities) {
        if (entities == null) {
            return null;
        }
        return entities.stream()
                .map(BookingMapper::toDtoWithoutCyclicDependency)
                .collect(Collectors.toList());
    }
}

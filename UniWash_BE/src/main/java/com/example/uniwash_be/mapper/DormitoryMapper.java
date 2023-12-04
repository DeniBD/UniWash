package com.example.uniwash_be.mapper;

import com.example.uniwash_be.dto.DormitoryDto;
import com.example.uniwash_be.entity.StudentDormitory;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DormitoryMapper {

    StudentDormitory toEntity(DormitoryDto bookingDto);
    DormitoryDto toDto(StudentDormitory booking);
    List<StudentDormitory> toEntities(List<DormitoryDto> bookingDtos);
    List<DormitoryDto> toDtos(List<StudentDormitory> bookings);

}

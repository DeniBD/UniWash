package com.example.uniwash_be.mapper;

import com.example.uniwash_be.dto.LaundryMachineDto;
import com.example.uniwash_be.entity.LaundryMachine;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface LaundryMapper {

    LaundryMachine toEntity(LaundryMachineDto laundryMachineDto);
    LaundryMachineDto toDto(LaundryMachine laundryMachine);
    List<LaundryMachine> toEntities(List<LaundryMachineDto> laundryMachineDtos);
    List<LaundryMachineDto> toDtos(List<LaundryMachine> laundryMachines);

}

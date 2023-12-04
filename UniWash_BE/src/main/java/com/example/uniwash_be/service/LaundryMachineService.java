package com.example.uniwash_be.service;

import com.example.uniwash_be.dto.LaundryMachineDto;
import com.example.uniwash_be.entity.LaundryMachine;
import com.example.uniwash_be.entity.enums.LaundryMachineType;
import com.example.uniwash_be.mapper.LaundryMapper;
import com.example.uniwash_be.repository.LaundryMachineRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class LaundryMachineService {

    private final LaundryMachineRepository laundryMachineRepository;
    private final LaundryMapper laundryMapper;

    public LaundryMachineService(LaundryMachineRepository laundryMachineRepository, LaundryMapper laundryMapper) {
        this.laundryMachineRepository = laundryMachineRepository;
        this.laundryMapper = laundryMapper;
    }

    public void addLaundryMachine(LaundryMachineDto laundryMachineDto) {
        LaundryMachine laundryMachine = laundryMachineRepository.save(laundryMapper.toEntity(laundryMachineDto));
        addDryer(laundryMachine);
    }

    private void addDryer(LaundryMachine laundryMachine) {
        LaundryMachine dryer = new LaundryMachine(
                null,
                laundryMachine.getName(),
                LaundryMachineType.DRYING_MACHINE,
                List.of(),
                laundryMachine.getStudentDormitory()
        );
        laundryMachineRepository.save(dryer);
    }

}

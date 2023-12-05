package com.example.uniwash_be.service;

import com.example.uniwash_be.dto.LaundryMachineDto;
import com.example.uniwash_be.entity.LaundryMachine;
import com.example.uniwash_be.entity.enums.LaundryMachineType;
import com.example.uniwash_be.mapper.LaundryMachineMapper;
import com.example.uniwash_be.repository.LaundryMachineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class LaundryMachineService {

    private final LaundryMachineRepository laundryMachineRepository;
    private final LaundryMachineMapper laundryMachineMapper;

    public LaundryMachineService(LaundryMachineRepository laundryMachineRepository, LaundryMachineMapper laundryMachineMapper) {
        this.laundryMachineRepository = laundryMachineRepository;
        this.laundryMachineMapper = laundryMachineMapper;
    }

    public void addLaundryMachine(LaundryMachineDto laundryMachineDto) {
        LaundryMachine laundryMachine = laundryMachineRepository.save(laundryMachineMapper.toEntity(laundryMachineDto));
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

    public void deleteLaundryMachine(Long machineId) {
        deleteDryer(machineId);
        laundryMachineRepository.deleteById(machineId);
    }

    private void deleteDryer(Long id) {
        LaundryMachine laundryMachine = laundryMachineRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No laundry machine found with id + " + id));
        LaundryMachine dryer = laundryMachineRepository.findByNameEqualsAndTypeEquals(laundryMachine.getName(), LaundryMachineType.DRYING_MACHINE)
                .orElseThrow(() -> new NoSuchElementException("No laundry machine found with id + " + id));
        laundryMachineRepository.delete(dryer);
    }

    public List<LaundryMachineDto> getAllLaundryMachines() {
        return laundryMachineMapper.toDtos(laundryMachineRepository.findAll());
    }

}

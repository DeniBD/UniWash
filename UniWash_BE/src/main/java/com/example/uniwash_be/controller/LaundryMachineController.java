package com.example.uniwash_be.controller;

import com.example.uniwash_be.dto.LaundryMachineDto;
import com.example.uniwash_be.service.LaundryMachineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("laundry-machine")
@CrossOrigin(origins = "http://localhost:3000")
public class LaundryMachineController {

    private final LaundryMachineService laundryMachineService;

    public LaundryMachineController(LaundryMachineService laundryMachineService) {
        this.laundryMachineService = laundryMachineService;
    }

    @GetMapping
    public ResponseEntity<List<LaundryMachineDto>> getAllLaundryMachines() {
        return ResponseEntity.ok(laundryMachineService.getAllLaundryMachines());
    }

    @PostMapping
    public ResponseEntity<?> addLaundryMachine(@RequestBody LaundryMachineDto laundryMachineDto) {
        laundryMachineService.addLaundryMachine(laundryMachineDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{machineId}")
    public ResponseEntity<?> deleteLaundryMachine(@PathVariable Long machineId) {
        laundryMachineService.deleteLaundryMachine(machineId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{studentDormitoryId}")
    public ResponseEntity<List<LaundryMachineDto>> getLaundryMachinesByStudentDormitoryId (@PathVariable Long studentDormitoryId) {
        return ResponseEntity.ok(laundryMachineService.getLaundryMachinesByStudentDormitoryId(studentDormitoryId));
    }

}

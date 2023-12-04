package com.example.uniwash_be.controller;

import com.example.uniwash_be.dto.LaundryMachineDto;
import com.example.uniwash_be.service.LaundryMachineService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("laundry-machine")
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

}

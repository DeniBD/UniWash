package com.example.uniwash_be.controller;

import com.example.uniwash_be.dto.DormitoryDto;
import com.example.uniwash_be.service.StudentDormitoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("dormitory")
public class StudentDormitoryController {

    private final StudentDormitoryService studentDormitoryService;

    public StudentDormitoryController(StudentDormitoryService studentDormitoryService) {
        this.studentDormitoryService = studentDormitoryService;
    }

    @PostMapping
    public ResponseEntity<?> addDormitory(@RequestBody DormitoryDto dormitoryDto) {
        studentDormitoryService.addDormitory(dormitoryDto);
        return ResponseEntity.ok().build();
    }

}

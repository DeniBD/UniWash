package com.example.uniwash_be.controller;

import com.example.uniwash_be.dto.StudentDormitoryDto;
import com.example.uniwash_be.service.StudentDormitoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("dormitory")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentDormitoryController {

    private final StudentDormitoryService studentDormitoryService;

    public StudentDormitoryController(StudentDormitoryService studentDormitoryService) {
        this.studentDormitoryService = studentDormitoryService;
    }

    @GetMapping
    public ResponseEntity<List<StudentDormitoryDto>> getAllDormitories() {
        return ResponseEntity.ok(studentDormitoryService.getAllDormitories());
    }

    @PostMapping
    public ResponseEntity<?> addDormitory(@RequestBody StudentDormitoryDto studentDormitoryDto) {
        studentDormitoryService.addDormitory(studentDormitoryDto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("{dormitoryId}")
    public ResponseEntity<?> deleteDormitory(@PathVariable Long dormitoryId) {
        studentDormitoryService.deleteDormitory(dormitoryId);
        return ResponseEntity.ok().build();
    }
}

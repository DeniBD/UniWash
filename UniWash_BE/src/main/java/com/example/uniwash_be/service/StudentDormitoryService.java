package com.example.uniwash_be.service;

import com.example.uniwash_be.dto.StudentDormitoryDto;
import com.example.uniwash_be.mapper.StudentDormitoryMapper;
import com.example.uniwash_be.repository.StudentDormitoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentDormitoryService {

    private final StudentDormitoryRepository studentDormitoryRepository;

    private final StudentDormitoryMapper studentDormitoryMapper;

    public StudentDormitoryService(StudentDormitoryRepository studentDormitoryRepository, StudentDormitoryMapper studentDormitoryMapper) {
        this.studentDormitoryRepository = studentDormitoryRepository;
        this.studentDormitoryMapper = studentDormitoryMapper;
    }

    public void addDormitory(StudentDormitoryDto studentDormitoryDto) {
        studentDormitoryRepository.save(studentDormitoryMapper.toEntity(studentDormitoryDto));
    }

    public List<StudentDormitoryDto> getAllDormitories() {
        return studentDormitoryMapper.toDtos(studentDormitoryRepository.findAll());
    }

    public void deleteDormitory(Long studentDormitoryId) {
        studentDormitoryRepository.deleteById(studentDormitoryId);
    }
}

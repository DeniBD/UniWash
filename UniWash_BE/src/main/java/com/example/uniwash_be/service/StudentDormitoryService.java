package com.example.uniwash_be.service;

import com.example.uniwash_be.dto.DormitoryDto;
import com.example.uniwash_be.mapper.DormitoryMapper;
import com.example.uniwash_be.repository.StudentDormitoryRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentDormitoryService {

    private final StudentDormitoryRepository studentDormitoryRepository;
    private final DormitoryMapper dormitoryMapper;

    public StudentDormitoryService(StudentDormitoryRepository studentDormitoryRepository, DormitoryMapper dormitoryMapper) {
        this.studentDormitoryRepository = studentDormitoryRepository;
        this.dormitoryMapper = dormitoryMapper;
    }

    public void addDormitory(DormitoryDto dormitoryDto) {
        studentDormitoryRepository.save(dormitoryMapper.toEntity(dormitoryDto));
    }

}

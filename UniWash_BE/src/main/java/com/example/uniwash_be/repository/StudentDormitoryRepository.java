package com.example.uniwash_be.repository;

import com.example.uniwash_be.entity.StudentDormitory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentDormitoryRepository extends JpaRepository<StudentDormitory, Long> {
}

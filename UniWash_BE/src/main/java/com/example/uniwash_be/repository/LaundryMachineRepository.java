package com.example.uniwash_be.repository;

import com.example.uniwash_be.entity.LaundryMachine;
import com.example.uniwash_be.entity.enums.LaundryMachineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LaundryMachineRepository extends JpaRepository<LaundryMachine, Long> {
}

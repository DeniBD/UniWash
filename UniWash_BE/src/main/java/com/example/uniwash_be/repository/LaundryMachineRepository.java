package com.example.uniwash_be.repository;

import com.example.uniwash_be.entity.LaundryMachine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaundryMachineRepository extends JpaRepository<LaundryMachine, Long> {

}

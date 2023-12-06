package com.example.uniwash_be.repository;

import com.example.uniwash_be.entity.Booking;
import com.example.uniwash_be.entity.enums.LaundryMachineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByDateAndStartTimeAndLaundryMachine_Type(
            LocalDate date, LocalTime startTime, LaundryMachineType machineType);

    Optional<List<Booking>> findAllByDateBetween(LocalDate now, LocalDate localDate);
}

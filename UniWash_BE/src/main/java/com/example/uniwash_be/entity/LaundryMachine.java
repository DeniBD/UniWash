package com.example.uniwash_be.entity;

import com.example.uniwash_be.entity.enums.LaundryMachineType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LaundryMachine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String name;

    @Column
    @Enumerated(EnumType.STRING)
    private LaundryMachineType type;

    @OneToMany(mappedBy = "laundryMachine")
    private List<Booking> bookingList;

    @ManyToOne
    @JoinColumn(name = "student_dormitory_id", referencedColumnName = "id")
    private StudentDormitory studentDormitory;

}

package com.example.uniwash_be.entity;

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
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String phoneNumber;

    @Column(nullable = false)
    private boolean is_admin;

    @Column
    private int currentWeekAppointments;

    @ManyToOne
    @JoinColumn(name = "student_dormitory_id", referencedColumnName = "id")
    private StudentDormitory studentDormitory;

    @OneToMany(mappedBy = "user")
    private List<Booking> bookingList;

}

package com.example.uniwash_be.service;

import com.example.uniwash_be.dto.BookingDto;
import com.example.uniwash_be.dto.UserDto;
import com.example.uniwash_be.entity.Booking;
import com.example.uniwash_be.entity.LaundryMachine;
import com.example.uniwash_be.entity.User;
import com.example.uniwash_be.entity.enums.LaundryMachineType;
import com.example.uniwash_be.mapper.BookingMapper;
import com.example.uniwash_be.mapper.UserMapper;
import com.example.uniwash_be.repository.BookingRepository;
import com.example.uniwash_be.repository.LaundryMachineRepository;
import com.example.uniwash_be.repository.UserRepository;
import com.example.uniwash_be.util.BookingUtil;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final LaundryMachineRepository laundryMachineRepository;
    private final BookingMapper bookingMapper;
    private final UserMapper userMapper;


    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          LaundryMachineRepository laundryMachineRepository,
                          BookingMapper bookingMapper,
                          UserMapper userMapper) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.laundryMachineRepository = laundryMachineRepository;
        this.bookingMapper = bookingMapper;
        this.userMapper = userMapper;
    }

    public List<BookingDto> getBookingsByUser(Long userId) {
        return userRepository.findById(userId)
                .map(User::getBookingList)
                .map(BookingMapper::toDtos)
                .orElse(List.of());
    }

    public void addBooking(BookingDto bookingDto) {
        assertUserIsEligibleForBooking(bookingDto.user());
        bookingRepository.save(bookingMapper.toEntity(bookingDto));
        addDryerBooking(bookingDto);
    }

    private void addDryerBooking(BookingDto bookingDto) {
        LaundryMachine dryerMachine = laundryMachineRepository.findByNameEqualsAndTypeEquals(bookingDto.laundry().name(), LaundryMachineType.DRYING_MACHINE)
                .orElseThrow();
        Booking dryerBooking = new Booking(
                null,
                bookingDto.date(),
                bookingDto.startTime().plusHours(2),
                bookingDto.status(),
                dryerMachine,
                userMapper.toEntity(bookingDto.user())
        );
        bookingRepository.save(dryerBooking);
    }

    private void assertUserIsEligibleForBooking(UserDto user) {
        List<BookingDto> bookingsByUser = getBookingsByUser(user.id());
        boolean areBookingsInCurrentWeek = BookingUtil.areBookingsInCurrentWeek(bookingsByUser);
        if (areBookingsInCurrentWeek) {
            throw new RuntimeException("User " + user + " has already made a booking in the current week.");
        }
    }

    public List<BookingDto> getAllBookingsInDormitory(Long dormitoryId) {
        List<LaundryMachine> laundryMachines = laundryMachineRepository.findByStudentDormitory_Id(dormitoryId)
                .orElseThrow(() -> new NoSuchElementException("No bookings found in dormitory with id + " + dormitoryId));
        List<Booking> bookingsInDormitory = laundryMachines.stream()
                .flatMap(l -> l.getBookingList().stream())
                .toList();
        return bookingMapper.toDtos(bookingsInDormitory);
    }

    public void deleteBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }
}


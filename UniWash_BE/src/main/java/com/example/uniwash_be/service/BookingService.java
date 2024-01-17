package com.example.uniwash_be.service;

import com.example.uniwash_be.dto.AvailableBookingSpot;
import com.example.uniwash_be.dto.BookingDto;
import com.example.uniwash_be.dto.StudentDormitoryDto;
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

import java.time.DayOfWeek;
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
    private final LaundryMachineService laundryMachineService;


    public BookingService(BookingRepository bookingRepository,
                          UserRepository userRepository,
                          LaundryMachineRepository laundryMachineRepository,
                          BookingMapper bookingMapper,
                          UserMapper userMapper, LaundryMachineService laundryMachineService) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.laundryMachineRepository = laundryMachineRepository;
        this.bookingMapper = bookingMapper;
        this.userMapper = userMapper;
        this.laundryMachineService = laundryMachineService;
    }

    public List<BookingDto> getBookingsByUser(Long userId) {
        return userRepository.findById(userId)
                .map(User::getBookingList)
                .map(BookingMapper::toDtos)
                .orElse(List.of());
    }

    public void addBooking(BookingDto bookingDto) {
        assertUserIsEligibleForBooking(bookingDto.user(), bookingDto.date());
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

    private void assertUserIsEligibleForBooking(UserDto user, LocalDate date) {
        List<BookingDto> bookingsByUser = getBookingsByUser(user.id());
        boolean areBookingsInCurrentWeek = BookingUtil.areBookingsInWeek(bookingsByUser, date);
        if (areBookingsInCurrentWeek) {
            throw new RuntimeException("User with email: " + user.email() + " has already made a booking in the current week.");
        }
    }

    public List<AvailableBookingSpot> getAvailableSlotsForWashingMachine(Long washingMachineId, LocalDate day) {
        LaundryMachine laundryMachine = laundryMachineRepository.findById(washingMachineId)
                .orElseThrow(() -> new NoSuchElementException("Washing machine with id + " + washingMachineId + " not found."));
        return computeAvailableSpotsForWashingMachine(laundryMachine, day);
    }

    private List<AvailableBookingSpot> computeAvailableSpotsForWashingMachine(LaundryMachine laundryMachine, LocalDate day) {
        List<Booking> existingBookingsInDay = laundryMachine.getBookingList().stream()
                .filter(b -> b.getDate().equals(day))
                .toList();

        List<LocalTime> availableTimes = BookingUtil.computeAvailableBookingTimes(bookingMapper.toDtos(existingBookingsInDay), day);

        List<AvailableBookingSpot> availableBookingSpots = availableTimes.stream()
                .map(time -> new AvailableBookingSpot(day, time))
                .toList();
        return availableBookingSpots;
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
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NoSuchElementException("No booking found with id + " + bookingId));
        Booking dryerBooking = bookingRepository.findByDateAndStartTimeAndLaundryMachine_Type(booking.getDate(), booking.getStartTime().plusHours(2), LaundryMachineType.DRYING_MACHINE)
                .orElseThrow(() -> new NoSuchElementException("No dryer booking found for booking with id + " + bookingId));
        bookingRepository.delete(dryerBooking);
        bookingRepository.deleteById(bookingId);
    }

    public Integer getBookedSlotsForCurrentWeek(StudentDormitoryDto studentDormitoryDto) {
        LocalDate currentDate = LocalDate.now();

        LocalDate mondayOfWeek = currentDate.with(DayOfWeek.MONDAY);

        LocalDate sundayOfWeek = currentDate.with(DayOfWeek.SUNDAY);

        List<Booking> bookingsInCurrentWeek = getAllBookingsInDormitory(studentDormitoryDto.id())
                .stream()
                .map(BookingMapper::toEntity)
                .filter(booking -> booking.getDate().isAfter(mondayOfWeek) && booking.getDate().isBefore(sundayOfWeek))
                .toList();
        int numberOfLaundryMachines = (laundryMachineService.getLaundryMachinesByStudentDormitoryId(studentDormitoryDto.id()).size())/2;
        return (int) ((100 * bookingsInCurrentWeek.size()/2) / (49.0 * numberOfLaundryMachines));
    }

    public Integer getBookedSlotsForNextWeek(StudentDormitoryDto studentDormitoryDto) {
        LocalDate currentDate = LocalDate.now();

        LocalDate mondayOfWeek = currentDate.with(DayOfWeek.MONDAY).plusDays(7);

        LocalDate sundayOfWeek = currentDate.with(DayOfWeek.SUNDAY).plusDays(7);

        List<Booking> bookingsInCurrentWeek = getAllBookingsInDormitory(studentDormitoryDto.id())
                .stream()
                .map(BookingMapper::toEntity)
                .filter(booking -> booking.getDate().isAfter(mondayOfWeek) && booking.getDate().isBefore(sundayOfWeek))
                .toList();
        int numberOfLaundryMachines = (laundryMachineService.getLaundryMachinesByStudentDormitoryId(studentDormitoryDto.id()).size())/2;
        return (int) ((100 * bookingsInCurrentWeek.size()/2) / (49.0 * numberOfLaundryMachines));
    }

    public List<BookingDto> getBookingsInCurrentWeekByUser(Long userId) {
        List<BookingDto> bookingsByUser = userRepository.findById(userId)
                .map(User::getBookingList)
                .map(BookingMapper::toDtos)
                .orElse(List.of());

        LocalDate currentDate = LocalDate.now();

        LocalDate mondayOfWeek = currentDate.with(DayOfWeek.MONDAY);

        LocalDate sundayOfWeek = currentDate.with(DayOfWeek.SUNDAY);

        return bookingsByUser
                .stream()
                .map(BookingMapper::toEntity)
                .filter(booking -> booking.getDate().isAfter(mondayOfWeek) && booking.getDate().isBefore(sundayOfWeek))
                .map(BookingMapper::toDto)
                .toList();
    }

    public List<BookingDto> getBookingsInNextWeekByUser(Long userId) {
        List<BookingDto> bookingsByUser = userRepository.findById(userId)
                .map(User::getBookingList)
                .map(BookingMapper::toDtos)
                .orElse(List.of());

        LocalDate currentDate = LocalDate.now();

        LocalDate mondayOfWeek = currentDate.with(DayOfWeek.MONDAY).plusDays(7);

        LocalDate sundayOfWeek = currentDate.with(DayOfWeek.SUNDAY).plusDays(7);

        return bookingsByUser
                .stream()
                .map(BookingMapper::toEntity)
                .filter(booking -> booking.getDate().isAfter(mondayOfWeek) && booking.getDate().isBefore(sundayOfWeek))
                .map(BookingMapper::toDto)
                .toList();
    }
}


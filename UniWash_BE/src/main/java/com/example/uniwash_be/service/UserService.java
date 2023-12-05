package com.example.uniwash_be.service;

import com.example.uniwash_be.dto.UserDto;
import com.example.uniwash_be.entity.User;
import com.example.uniwash_be.mapper.UserMapper;
import com.example.uniwash_be.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    public UserDto createUser(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        User savedUser = userRepository.save(user);
        return userMapper.toDto(savedUser);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return userMapper.toDtos(users);
    }

    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        return userMapper.toDto(user);
    }
}

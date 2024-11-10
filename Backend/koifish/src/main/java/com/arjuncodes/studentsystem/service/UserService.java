package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
}

package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface UserService {
     User saveUser(User user);
     List<User> getAllUsers();

     User getUserById(int id);
     User updateUser(int id, User userDetails);
}
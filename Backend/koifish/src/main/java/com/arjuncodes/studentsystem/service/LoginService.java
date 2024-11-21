package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.User;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface LoginService {

    ResponseEntity<Map<String, Object>> loginUser(User loginRequest);

    String addUser(User registerRequest);
}

package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.Dto.LoginDTO;
import com.arjuncodes.studentsystem.response.LoginResponse;
import com.arjuncodes.studentsystem.service.LoginService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping(path = "/login")
   public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {

        LoginResponse loginResponse = loginService.loginUser(loginDTO);
        return ResponseEntity.ok(loginResponse);
    }
}

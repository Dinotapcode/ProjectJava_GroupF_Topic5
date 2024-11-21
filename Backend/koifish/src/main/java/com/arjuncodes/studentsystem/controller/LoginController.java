<<<<<<< HEAD
//package com.arjuncodes.studentsystem.controller;
//
//import com.arjuncodes.studentsystem.Dto.LoginDTO;
//import com.arjuncodes.studentsystem.response.LoginResponse;
//import com.arjuncodes.studentsystem.service.LoginService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@CrossOrigin
//@RequestMapping("/api")
//public class LoginController {
//
//    @Autowired
//    private LoginService loginService;
//
//    @PostMapping(path = "/login")
//   public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password) {
//
//        LoginResponse loginResponse = loginService.loginUser(loginDTO);
//        return ResponseEntity.ok(loginResponse);
//    }
//}
=======
package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping(path = "/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User loginRequest) {
        return loginService.loginUser(loginRequest);
    }


    @PostMapping(path = "/register")
    public ResponseEntity<String> registerUser(@RequestBody User registerRequest) {

        String response = loginService.addUser(registerRequest);
        if (response.equals("Email is already registered")) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }
        return ResponseEntity.ok(response);
    }
}
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b

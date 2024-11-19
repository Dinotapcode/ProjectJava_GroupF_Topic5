package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.repository.LoginRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class LoginIMPL implements LoginService {

    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<Map<String, Object>> loginUser(User loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User user = loginRepository.findByEmail(email);
        if (user != null) {
            // Kiểm tra mật khẩu đã mã hóa
            if (passwordEncoder.matches(password, user.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login Success");
                response.put("userId", user.getId());
                response.put("role", user.getRole());
                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Password does not match");
                return ResponseEntity.status(400).body(response);
            }
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User not found");
            return ResponseEntity.status(404).body(response);
        }
    }


    @Override
    public String addUser(User user) {

        if (loginRepository.existsByEmail(user.getEmail())) {
            return "Email is already registered";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if (user.getWallet() == null) {
            user.setWallet(null);
        }
        if (user.getAvatar() == null) {
            user.setAvatar(null);
        }
        if (user.getBirthday() == null) {
            user.setBirthday(null);
        }
        if (user.getPhone() == null) {
            user.setPhone(null);
        }

        if (!user.isEnabled()) {
            user.setEnabled(true);
        }
        user.setRole("USER");
        loginRepository.save(user);
        return user.getUserName();
    }

}

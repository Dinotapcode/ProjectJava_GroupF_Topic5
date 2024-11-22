package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private static final String UPLOAD_DIR = "Frontend/koifish/src/assets/admin/avatar_user/uploads";

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User saveUser(User user, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            // Create file name with UUID
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

            // Save the image file
            File file = new File(UPLOAD_DIR, fileName);
            image.transferTo(file);

            // Save the file name into entity
            user.setAvatar(fileName);
        }

        return userRepository.save(user);
    }

    public long countUsers() {
        return userRepository.count();
    }

    public void updateUserStatus(int id, boolean enabled) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setEnabled(enabled);
        userRepository.save(user);
    }

    // Method to deduct money from user's wallet
    public boolean deductBalance(int userId, Double amount) {
        User user = userRepository.findById(userId).orElse(null);

        if (user != null && user.getWallet() != null) {
            BigDecimal currentBalance = user.getWallet();
            BigDecimal deduction = new BigDecimal(amount);

            // Check if balance is enough for deduction
            if (currentBalance.compareTo(deduction) >= 0) {
                // Deduct the amount from wallet
                user.setWallet(currentBalance.subtract(deduction));
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }
}

package com.arjuncodes.studentsystem.service;
import com.arjuncodes.studentsystem.model.User;

import com.arjuncodes.studentsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
            // Tạo tên file với mã định danh UUID
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();


            // Lưu file ảnh
            File file = new File(UPLOAD_DIR, fileName);
            image.transferTo(file);

            // Lưu tên file vào entity
            user.setAvatar(fileName);
        }

        return userRepository.save(user);
    }


}

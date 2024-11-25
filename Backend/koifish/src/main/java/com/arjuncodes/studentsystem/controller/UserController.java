package com.arjuncodes.studentsystem.controller;

import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.repository.UserRepository;
import com.arjuncodes.studentsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Date;
import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

<<<<<<< HEAD
    @GetMapping("/admin/user/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
=======
    @GetMapping("/admin/user/all")
    public List<User> getAllUsers() {
            return userService.getAllUsers();
>>>>>>> 138404ea4e5f8076d17d33c23f82bd8a9c2c65eb
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable int id) {
        try {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/admin/users/count")
    public ResponseEntity<Long> countUser() {
        long count = userService.countUsers();
        return ResponseEntity.ok(count);
    }

    @PutMapping("/user/update/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Integer id,
            @RequestParam String userName,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam Date birthday,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar
    ) {
        try {
            User existingUser = userService.getUserById(id);
            if (existingUser == null) {
                return ResponseEntity.notFound().build();
            }

            existingUser.setUserName(userName);
            existingUser.setEmail(email);
            existingUser.setPhone(phone);
            existingUser.setBirthday(birthday);

            // Handle avatar upload
            if (avatar != null && !avatar.isEmpty()) {
                String avatarFileName = uploadAvatarFile(avatar);
                if (avatarFileName != null) {
                    existingUser.setAvatar(avatarFileName);
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(null); // Handle upload error
                }
            }

            User updatedUser = userService.saveUser(existingUser, null); // Pass null as avatar is already handled
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String uploadAvatarFile(MultipartFile uploadfile) {
        String fileName = UUID.randomUUID() + "_" + uploadfile.getOriginalFilename();
        // Sử dụng đường dẫn tuyệt đối hoặc tương đối
        Path destinationPath = Paths.get("Frontend/koifish/public/uploads/img_avatar").resolve(fileName);

        try {
            // Tạo thư mục nếu nó không tồn tại
            Files.createDirectories(destinationPath.getParent());

            Files.copy(uploadfile.getInputStream(), destinationPath, StandardCopyOption.REPLACE_EXISTING);
            return fileName; // Return the filename for saving in the user entity
        } catch (IOException e) {
            System.out.println("Upload Image Error: " + e.getMessage());
            return null; // Handle error appropriately
        }
    }


    @PutMapping("/admin/user/actions/{id}")
    public String updateUserStatus(@PathVariable int id, @RequestParam boolean enabled) {
        userService.updateUserStatus(id, enabled);
        return enabled ? "User is now active" : "User has been banned";
    }

    @PutMapping("/admin/user/role/{id}")
    public ResponseEntity<User> updateUserRole(
            @PathVariable int id,
            @RequestParam User.Role role) {
        try {
            // Lấy người dùng theo id
            User user = userService.getUserById(id);

            if (user == null) {
                return ResponseEntity.notFound().build();  // Nếu không tìm thấy người dùng
            }

            // Cập nhật vai trò
            user.setRole(role);

            // Lưu người dùng với vai trò mới
            User updatedUser = userService.saveUser(user, null);  // Pass null because avatar upload isn't required here

            return ResponseEntity.ok(updatedUser);  // Trả về thông tin người dùng đã được cập nhật
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // Trả về lỗi server nếu có sự cố
        }
    }
}

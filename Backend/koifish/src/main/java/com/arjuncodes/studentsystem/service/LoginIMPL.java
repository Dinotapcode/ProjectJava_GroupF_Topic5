package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.Dto.LoginDTO;
import com.arjuncodes.studentsystem.Dto.UserDTO;
import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.repository.LoginRepository;
import com.arjuncodes.studentsystem.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class LoginIMPL implements LoginService {


    @Autowired
    private LoginRepository loginRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public String addUser(UserDTO userDTO) {


        User user = new User(
                userDTO.getId(),
                userDTO.getUserName(),
                userDTO.getEmail(),
                this.passwordEncoder.encode(userDTO.getPassword())
        );

        loginRepository.save(user);
        return user.getUserName();



    }

    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {
        String msg = "";
        User user1 = loginRepository.findByEmail(loginDTO.getEmail());
        if (user1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = user1.getPassword();
            Boolean isPasswordCorrect = passwordEncoder.matches(password, encodedPassword);
            if (isPasswordCorrect) {
                Optional<User> user = loginRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    return new LoginResponse("login Sucess", true);
                } else {
                    return new LoginResponse("login Failed", false);
                }
            } else {
                return new LoginResponse("Password Not Match", false);
            }
        } else{
            return new LoginResponse("Mail not exits", false);
        }


    }
}


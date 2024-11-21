<<<<<<< HEAD
//package com.arjuncodes.studentsystem.service;
//
//
//import com.arjuncodes.studentsystem.Dto.LoginDTO;
//import com.arjuncodes.studentsystem.Dto.UserDTO;
//import com.arjuncodes.studentsystem.response.LoginResponse;
//import org.springframework.stereotype.Service;
//
//@Service
//
//public interface LoginService {
//
//
//    String addUser(UserDTO userDTO);
//
//
//    LoginResponse loginUser(LoginDTO loginDTO);
//}
=======
package com.arjuncodes.studentsystem.service;

import com.arjuncodes.studentsystem.model.User;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface LoginService {

    ResponseEntity<Map<String, Object>> loginUser(User loginRequest);

    String addUser(User registerRequest);
}
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b

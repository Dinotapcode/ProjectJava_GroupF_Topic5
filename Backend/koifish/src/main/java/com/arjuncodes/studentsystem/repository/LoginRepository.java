<<<<<<< HEAD
//package com.arjuncodes.studentsystem.repository;
//
//
//import com.arjuncodes.studentsystem.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
//import org.springframework.stereotype.Repository;
//
//import java.util.Optional;
//
//@EnableJpaRepositories
//@Repository
//
//public interface LoginRepository extends JpaRepository<User, Integer> {
//
//    Optional <User> findOneByEmailAndPassword(String email, String password);
//
//    User findByEmail(String email);
//
//
//
//
//
//}
=======
package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<User, Integer> {

    Optional<User> findOneByEmailAndPassword(String email, String password);

    User findByEmail(String email);

    boolean existsByEmail(String email);
}
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b

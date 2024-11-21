<<<<<<< HEAD
//package com.arjuncodes.studentsystem.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public UserDetailsService userDetailsService() {
//        InMemoryUserDetailsManager manager = new InMemoryUserDetailsManager();
//        manager.createUser(User.withUsername("admin")
//                .password(passwordEncoder().encode("admin123"))
//                .roles("ADMIN")
//                .build());
//        manager.createUser(User.withUsername("user")
//                .password(passwordEncoder().encode("user123"))
//                .roles("USER")
//                .build());
//        return manager;
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        // Tắt CSRF
//        http.csrf(csrf -> csrf.disable());
//
//        // Phân quyền
//        http.authorizeHttpRequests(auth -> auth
//                .requestMatchers("/api/admin/**").hasRole("ADMIN")
//                .requestMatchers("/api/user/**").hasRole("USER")
//                .anyRequest().authenticated()
//        );
//
//        // Đăng nhập
//        http.formLogin(form -> form
//                .loginProcessingUrl("/api/login")
//                .successHandler((request, response, authentication) -> {
//                    response.setStatus(200);
//                    response.setContentType("application/json");
//                    response.getWriter().write("{\"status\":\"SUCCESS\",\"message\":\"Đăng nhập thành công\"}");
//                })
//                .failureHandler((request, response, exception) -> {
//                    response.setStatus(401);
//                    response.setContentType("application/json");
//                    response.getWriter().write("{\"status\":\"FAIL\",\"message\":\"Sai thông tin đăng nhập\"}");
//                })
//        );
//
//        return http.build();
//    }
//}
=======
package com.arjuncodes.studentsystem.config;

import com.arjuncodes.studentsystem.model.User;
import com.arjuncodes.studentsystem.repository.LoginRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final LoginRepository loginRepository;

    public SecurityConfig(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return email -> {
            User user = loginRepository.findByEmail(email);
            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }
            // Trả về đối tượng UserDetails chứa email, password đã mã hóa, và role
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getEmail())
                    .password(user.getPassword())
                    .roles(user.getRole().name().replace("ROLE_", "")) // Loại bỏ tiền tố ROLE_
                    .build();
        };
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/login", "/api/register", "/api/public/**").permitAll()  // Cho phép tất cả
                .antMatchers("/api/admin/**").hasRole("ADMIN")
                .antMatchers("/api/user/**").hasRole("USER")  // Phân quyền cho admin
                .anyRequest().permitAll()  // Các request còn lại không yêu cầu xác thực
                .and()
                .httpBasic();
        return http.build();
    }


    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder passwordEncoder,
                                                       UserDetailsService userDetailsService) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder)
                .and()
                .build();
    }
}
>>>>>>> f819474dc012cfa00db1fe8761d4676f6da07f0b

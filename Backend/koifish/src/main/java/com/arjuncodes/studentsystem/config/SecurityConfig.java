package com.arjuncodes.studentsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/login", "/api/register", "/api/public/**").permitAll() // Các endpoint không yêu cầu xác thực
                .antMatchers("/api/admin/**").hasRole("ADMIN") // Chỉ cho ADMIN
                .antMatchers("/api/user/**").hasRole("USER") // Chỉ cho USER
                .anyRequest().authenticated() // Yêu cầu xác thực với các yêu cầu khác
                .and()
                .httpBasic(); // Dùng xác thực HTTP Basic
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

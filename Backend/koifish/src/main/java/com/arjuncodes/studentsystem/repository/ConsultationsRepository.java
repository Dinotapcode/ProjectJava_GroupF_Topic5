package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Consultations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultationsRepository extends JpaRepository<Consultations, Integer> {
    // Các phương thức truy vấn tùy chỉnh nếu cần
}

package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Element;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElementRepository extends JpaRepository<Element, String> {
}

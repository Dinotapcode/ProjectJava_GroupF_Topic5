package com.arjuncodes.studentsystem.repository;

import com.arjuncodes.studentsystem.model.Pond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PondRepository extends JpaRepository<Pond, Integer> {
    @Query("SELECT DISTINCT p.shape FROM Pond p")
    List<String> findDistinctShapeBy();
    List<Pond> findByElement(String element);
    List<Pond> findByShape(String shape);
}
